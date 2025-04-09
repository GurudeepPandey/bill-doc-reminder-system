import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    } catch (error) {
        console.log("DB connection failed");
        console.log(error);
    }
}

export default connectDB;