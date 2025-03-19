import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserInfo from "./InfoUser"; 

const userSchema  = new mongoose.Schema({
    account: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token : {type: String},
    authenticated: { type: Boolean },
    role: {type: [String], enum: ["seller", "user"], default: "user" },
    info: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo" }
}, {timestamps: true})

userSchema.pre('save' , async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt);
    next()
})
const User = mongoose.models.users || mongoose.model('users' , userSchema)
export default User