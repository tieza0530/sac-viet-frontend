import mongoose from "mongoose";

export const connectDB = async () => {
    console.log(process.env.DB_CONN_STRING);
    try {
        mongoose.connect(`${process.env.DB_CONN_STRING}`);
        console.log("Connect Success!"); 
    } catch (error) {
        console.log("Connect Failed!!!", error);
        
    }
}   