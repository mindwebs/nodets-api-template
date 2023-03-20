import mongoose from "mongoose";

/**
 * connect function connects the application to mongo db and returns the connection instance
 *
 * @param {string} connectionURI the uri connection string
 * @returns  {Promise<typeof mongoose>} db connection instance
 */
const connect = async (connectionURI: string): Promise<typeof mongoose> => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(connectionURI);
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

/**
 * isValidConnectionURI checks whether the passed uri string is of the valid mongodb uri format
 *
 * @param {string} connectionURI
 * @returns  {boolean}
 */
const isValidConnectionURI = (connectionURI: string): boolean => {
    // check for invalid uri string
    if (
        connectionURI.substring(0, 14) !== "mongodb+srv://" &&
        connectionURI.substring(0, 10) !== "mongodb://"
    )
        return false;
    return true;
};

export { connect, getConnectionState, isValidConnectionURI };
