require("dotenv").config();

const MONGO_URL = process.env.DBNAME;
const PORT = process.env.PORT;

module.exports = {MONGO_URL,PORT}
