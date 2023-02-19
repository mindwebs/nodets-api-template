import mongoose from "mongoose";

const connect = async (): Promise<typeof mongoose> => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(String(process.env.CONNECTION_URI));
};

export { connect };
