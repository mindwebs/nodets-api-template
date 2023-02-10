import mongoose from "mongoose";

const connect = () => mongoose.connect(
    String(process.env.CONNECTION_URI),
    {},
    (err: mongoose.CallbackError) => {
        if (err) console.log(err);
        else console.log("Connection with MongoDB established");
    }
);

export default connect;
