import mongoose from "mongoose";

/**
 * connect function connects the application to mongo db and returns the connection instance
 *
 * @returns  {Promise<typeof mongoose>} db connection instance
 */
const connect = async (mongoUri: string): Promise<typeof mongoose | null> => {
    // check for invalid uri string
    if (
        mongoUri.substring(0, 14) !== "mongodb+srv://" &&
        mongoUri.substring(0, 10) !== "mongodb://"
    )
        return null;

    mongoose.set("strictQuery", false);
    return mongoose.connect(mongoUri);
};

/**
 * getConnectionState function accepts a mongo instance state field and returns the equivalent state as string
 *
 * @param {number} readyState numbered-state of the db connection
 * @returns  {string} human readable stringified state of the db connection
 */
const getConnectionState = (readyState: number): string => {
    switch (readyState) {
        case 0:
            return "Disconnected";
        case 1:
            return "Connected";
        case 2:
            return "Connecting";
        case 3:
            return "Disconnecting";
        default:
            return "Uninitialized";
    }
};

export { connect, getConnectionState };
