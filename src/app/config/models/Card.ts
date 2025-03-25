import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    list_products:  [{
        productID:  {type: String},
        added_at: { type: Date, default: Date.now },
    }]
}, { timestamps: true})

const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);

export default Card;
