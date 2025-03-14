import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: {type : String , required: true, unique: true},
    otp: {type : String },
    createdAt: {type: Date , default: Date.now, expires: 120 },
})

const Otp = mongoose.models.Otp  || mongoose.model("Otp", OtpSchema)
export default Otp;
