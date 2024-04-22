import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/mernapp`);

        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        console.log(`MongoDB Connected: ${mongoose.connection.name}`);

        mongoose.connection.on("error", (error) => {
            console.log("Error connecting to MongoDB", error);
        });
    } catch (error) {
        console.log("something went wrong in the db", error);
    }
};

export default connectDB;
