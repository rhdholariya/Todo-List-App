const mongoose = require('mongoose');
require("dotenv").config();
const connectDB = () => {
    mongoose.connect(process.env.BASE_URL)
        .then(() => console.log("Database connected successfully"))
        .catch((err) => {
            console.error("Database failed to connect",err.message);
        });
}

module.exports = connectDB;
