import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    list_products: [
      {
        productID: { type: String, required: true },
        quantity: { type: Number, required: true },
        order_at: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: [
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
              "returned",
            ],
            default: "pending",
          },
          payment_method: {
            type: String,
            enum: ["cod","cash", "credit_card", "paypal"],
            default: "cod",
          },
          is_paid: { type: Boolean, default: false },
          paid_at: { type: Date },
          cancelled_at: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
