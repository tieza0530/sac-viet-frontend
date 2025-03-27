import mongoose from "mongoose";

export type ListProductProps = {
    productID: string,
    _id: string,
    added_at: Date;
}

const CardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    list_products:  [{
        productID:  {type: String},
        added_at: { type: Date, default: Date.now },
    }]
}, { timestamps: true})

const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);

export default Card;
