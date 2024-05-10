// routes/checkout.js
const express = require('express');
const router = express.Router();
const CheckoutItem = require('../models/CheckoutItem');

// Route to add a new checkout item
router.post("/add", async (req, res) => {
    try {
        // Extract data from request body
        const { email, phone, paymentNumber } = req.body;

        // Create a new instance of the CheckoutItem model
        const newCheckoutItem = new CheckoutItem({
            email: email,
            phone: phone,
            paymentNumber: paymentNumber
        });

        // Save the new checkout item to the database
        await newCheckoutItem.save();

        // Respond with success message and the new item
        res.status(201).json({ message: 'Checkout item added successfully', item: newCheckoutItem });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.log(error);
        res.status(500).json({ error: "An error occurred while adding the checkout item." });
    }
});

module.exports = router;
