import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const dbConnection = mongoose.connect(process.env.MONGO_URI);
        console.log("connectDB successfull");
        return dbConnection;
    } catch (error) {
        throw new Error("'Connection failed:', error");
    }

};

export default connectDB;