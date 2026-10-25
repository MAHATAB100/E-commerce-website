
const mongoose = require("mongoose");
const crypto = require("crypto");

const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Validate cart
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    if (items.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Too many different products in one order",
      });
    }

    // COD is the only supported payment method for now.
    if (paymentMethod !== "COD") {
      return res.status(400).json({
        success: false,
        message: "Only Cash on Delivery is currently available",
      });
    }

    // Validate shipping information
    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "address",
      "city",
      "postalCode",
    ];

    if (
      !shippingAddress ||
      typeof shippingAddress !== "object" ||
      requiredFields.some(
        (field) =>
          typeof shippingAddress[field] !== "string" ||
          !shippingAddress[field].trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete shipping information",
      });
    }

    const cleanAddress = {
      fullName: shippingAddress.fullName.trim(),
      phone: shippingAddress.phone.trim(),
      email: shippingAddress.email.trim().toLowerCase(),
      address: shippingAddress.address.trim(),
      city: shippingAddress.city.trim(),
      postalCode: shippingAddress.postalCode.trim(),
    };

    if (
      cleanAddress.fullName.length > 100 ||
      cleanAddress.phone.length > 25 ||
      cleanAddress.email.length > 254 ||
      cleanAddress.address.length > 300 ||
      cleanAddress.city.length > 100 ||
      cleanAddress.postalCode.length > 20 ||
      !/^\S+@\S+\.\S+$/.test(cleanAddress.email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please check your shipping information",
      });
    }

    // Validate product IDs and quantities.
    const quantities = new Map();

    for (const item of items) {
      if (
        !item ||
        typeof item.id !== "string" ||
        !item.id.trim() ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product or quantity in your cart",
        });
      }

      const id = item.id.trim();
      quantities.set(id, (quantities.get(id) || 0) + item.quantity);

      if (quantities.get(id) > 100) {
        return res.status(400).json({
          success: false,
          message: "Maximum quantity per product is 100",
        });
      }
    }

    // Get trusted product data from MongoDB.
    const productIds = [...quantities.keys()];

    const products = await Product.find({
      productId: { $in: productIds },
    }).lean();

    const productMap = new Map(
      products.map((product) => [product.productId, product])
    );

    if (products.length !== productIds.length) {
      return res.status(400).json({
        success: false,
        message: "One or more products are no longer available",
      });
    }

    let subtotal = 0;

    const orderItems = productIds.map((productId) => {
      const product = productMap.get(productId);
      const quantity = quantities.get(productId);

      if (!Number.isFinite(product.price) || product.price < 0) {
        throw new Error(`Invalid database price for ${productId}`);
      }

      if (product.stock < quantity) {
        const error = new Error(
          `${product.name} does not have enough stock`
        );
        error.statusCode = 409;
        throw error;
      }

      subtotal += product.price * quantity;

      return {
        productId: product.productId,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      };
    });

    // Fixed example shipping fee: ৳60.
    const shippingFee = 60;
    const totalAmount = subtotal + shippingFee;

    // Create the order and decrement stock atomically.
    // A transaction requires MongoDB to run as a replica set.
    const session = await mongoose.startSession();
    let savedOrder;

    try {
      await session.withTransaction(async () => {
        // Re-check stock and decrement it within the transaction.
        for (const item of orderItems) {
          const stockResult = await Product.updateOne(
            {
              productId: item.productId,
              stock: { $gte: item.quantity },
            },
            {
              $inc: { stock: -item.quantity },
            },
            { session }
          );

          if (stockResult.modifiedCount !== 1) {
            const error = new Error(
              `${item.name} is out of stock or has insufficient stock`
            );
            error.statusCode = 409;
            throw error;
          }
        }

        const [order] = await Order.create(
          [
            {
              orderNumber: `SN-${crypto.randomUUID()
                .replace(/-/g, "")
                .slice(0, 12)
                .toUpperCase()}`,
              user: req.user.id,
              items: orderItems,
              shippingAddress: cleanAddress,
              paymentMethod: "COD",
              paymentStatus: "Pending",
              orderStatus: "Placed",
              subtotal,
              shippingFee,
              totalAmount,
            },
          ],
          { session }
        );

        savedOrder = order;
      });
    } finally {
      await session.endSession();
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: {
        id: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        items: savedOrder.items,
        subtotal: savedOrder.subtotal,
        shippingFee: savedOrder.shippingFee,
        totalAmount: savedOrder.totalAmount,
        paymentMethod: savedOrder.paymentMethod,
        paymentStatus: savedOrder.paymentStatus,
        orderStatus: savedOrder.orderStatus,
        createdAt: savedOrder.createdAt,
      },
    });
  } catch (error) {
    if (error.statusCode === 409) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create order error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to place order. Please try again.",
    });
  }
};
