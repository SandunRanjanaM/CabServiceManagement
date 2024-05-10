// routes/inventory.js
const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

// Route to add a new inventory item
router.route("/add").post(async (req, res) => {
    try {
        // Extract data from request body
        const { itemName, quantity, category, price } = req.body;

        // Create a new instance of the InventoryItem model
        const newInventoryItem = new InventoryItem({
            itemName: itemName,
            quantity: quantity,
            category: category,
            price: price
        });

        // Save the new inventory item to the database
        await newInventoryItem.save();

        // Respond with success message and the new item
        res.status(201).json({ message: 'Inventory item added successfully', item: newInventoryItem });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.log(error);
        res.status(500).json({ error: "An error occurred while adding the inventory item." });
    }
});

// Route to get all inventory items
router.route("/list").get(async (req, res) => {
    try {
        // Retrieve all inventory items from the database
        const inventoryItems = await InventoryItem.find();

        // Respond with the list of inventory items
        res.json(inventoryItems);
    } catch (error) {
        // If an error occurs, respond with an error message
        res.status(500).json({ error: error.message });
    }
});

// Route to get details of a single inventory item by ID
router.route("/get/:id").get(async (req, res) => {
    try {
        // Find the inventory item by ID
        const inventoryItem = await InventoryItem.findById(req.params.id);

        // If the item is not found, respond with a 404 error
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        // Respond with the inventory item
        res.json(inventoryItem);
    } catch (error) {
        // If an error occurs, respond with an error message
        res.status(500).json({ error: error.message });
    }
});

// Route to update an inventory item by ID
router.route("/update/:id").put(async (req, res) => {
    try {
        // Extract updated data from request body
        const { itemName, quantity, category, price } = req.body;

        // Find and update the inventory item by ID
        const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(req.params.id, { itemName, quantity, category, price }, { new: true });

        // If the item is not found, respond with a 404 error
        if (!updatedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        // Respond with success message and the updated item
        res.status(200).json({ message: 'Inventory item updated', item: updatedInventoryItem });
    } catch (error) {
        // If an error occurs, respond with an error message
        res.status(500).json({ error: error.message });
    }
});

// Route to delete an inventory item by ID
router.route("/delete/:id").delete(async (req, res) => {
    try {
        // Find and delete the inventory item by ID
        const deletedInventoryItem = await InventoryItem.findByIdAndDelete(req.params.id);

        // If the item is not found, respond with a 404 error
        if (!deletedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        // Respond with success message
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        // If an error occurs, respond with an error message
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
