import mongoose from "mongoose";

export type ListProductProps = {
  productID: string;
  _id: string;
  quantity: number,
  added_at: Date;
};

const CardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    list_products: [
      {
        productID: { type: String },
        quantity: { type: Number, default: 1 },
        added_at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);

export default Card;
