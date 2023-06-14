import mongoose from "mongoose";

export const connectDB = async () => {
    if (process.env.MONGO_URI) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {});
            console.log('Connected to Mongodb');
        } catch(err) {
            console.log(err)
        }
    }
};

