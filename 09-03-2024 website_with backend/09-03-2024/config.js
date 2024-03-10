const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/Login_tut");

// check database connected or not
connect.then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});


// create a schema
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
 
const collection = new mongoose.model("users", loginSchema);

module.exports = collection;
