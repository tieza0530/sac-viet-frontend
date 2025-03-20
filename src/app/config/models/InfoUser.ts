import mongoose from "mongoose";

const InfoUserSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullname: {type: String},
    phoneNumber: {type: String},
    address: {type: [{address: String, phone: String}]},
    avatar: {type: String},
    dateOfBirth: {type: Date},
    gender: {type: String}
}, { timestamps: true})

const UserInfo = mongoose.models.UserInfo || mongoose.model("UserInfo", InfoUserSchema);

export default UserInfo;
