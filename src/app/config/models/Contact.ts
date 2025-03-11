import mongoose, { model, models } from "mongoose";

const ContactFromCustomer = new mongoose.Schema({
    name : String, 
    email: String,
    phone: String, 
    message: String,
},{timestamps: true})

const Contact = models.ContactFromCustomer || model("ContactFromCustomer", ContactFromCustomer);
export default Contact