const express = require('express');
const cors = require('cors');
const indexRoutes = require('./routes/index.js');
const connectDB = require('./config/db.js');
const {PORT} = require("./config/constant");

const port = PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

app.use("/", indexRoutes);

app.listen(port, async () => {
    try {
        await connectDB();
        console.log("server established successfully on port " + port);
    } catch (error) {
        console.log(error);
    }
});
