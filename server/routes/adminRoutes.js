const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const {
  adminMiddleware,
} = require("../middleware/adminMiddleware");

router.get(
  "/dashboard",
  protect,
  adminMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to ShopNest Admin Dashboard",
      user: req.user,
    });
  }
);



router.get(
  "/orders",
  protect,
  adminMiddleware,
  getAllOrders
);

router.patch(
  "/orders/:id/status",
  protect,
  adminMiddleware,
  updateOrderStatus
);
router.patch(
  "/orders/:id/payment-status",
  protect,
  adminMiddleware,
  updatePaymentStatus
);

module.exports = router;