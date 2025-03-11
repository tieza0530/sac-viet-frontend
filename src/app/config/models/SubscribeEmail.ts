import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    emailCustomer: String
}, {timestamps: true});

const SubscribeEmail = mongoose.models.SubscribeEmail || mongoose.model('SubscribeEmail' , PostSchema)
export default SubscribeEmail