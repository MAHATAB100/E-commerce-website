
const path = require("path");
const { pathToFileURL } = require("url");

require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");

// Change "shopnest-client" if your frontend folder has another name.

const frontendProductsPath = path.resolve(
  __dirname,
  "../src/data/products.js"
);


const seedProducts = async () => {
  try {
    await connectDB();

    // Import the frontend ES module dynamically.
    const frontendModule = await import(
      pathToFileURL(frontendProductsPath).href
    );

    const products = frontendModule.products;

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error("No products found in the frontend products.js file.");
    }

    const operations = products.map((product) => {
      const productId = String(product.id);

      return {
        updateOne: {
          filter: { productId },
          update: {
            $set: {
              productId,
              name: product.name,
              category: product.category,
              price: product.price,
              oldPrice: product.oldPrice ?? 0,
              rating: product.rating ?? 0,
              reviews: product.reviews ?? 0,
              image: product.image,
              badge: product.badge ?? "",
            },
            $setOnInsert: {
              stock: 100,
            },
          },
          upsert: true,
        },
      };
    });

    const result = await Product.bulkWrite(operations);

    console.log("Product seeding completed!");
    console.log("Products in source file:", products.length);
    console.log("New products:", result.upsertedCount);
    console.log("Updated products:", result.modifiedCount);
    console.log("Matched products:", result.matchedCount);
  } catch (error) {
    console.error("Product seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    // Close the MongoDB connection after seeding.
    const mongoose = require("mongoose");
    await mongoose.disconnect();
  }
};

seedProducts();
