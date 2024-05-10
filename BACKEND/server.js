// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8091;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB Connection Success!");
});

const inventoryRouter = require("./routes/inventory.js");
const checkoutRouter = require("./routes/checkoutItem.js"); // Import checkout router

// Use inventoryRouter and checkoutRouter
app.use('/inventory', inventoryRouter);
app.use('/checkout', checkoutRouter); // Use checkoutRouter here

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
