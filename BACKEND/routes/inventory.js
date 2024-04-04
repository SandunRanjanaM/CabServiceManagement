const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/InventoryItem");

// Route to create a new inventory item
router.post("/add", async (req, res) => {
    try {
        const { itemName, quantity, category } = req.body;
        const newInventoryItem = new InventoryItem({ itemName, quantity, category });
        await newInventoryItem.save();
        res.status(201).json({ message: 'Inventory item added successfully', item: newInventoryItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all inventory items
router.get("/list", async (req, res) => {
    try {
        const inventoryItems = await InventoryItem.find();
        res.json(inventoryItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update an inventory item by ID
router.put("/:id", async (req, res) => {
    try {
        const { itemName, quantity, category } = req.body;
        const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(req.params.id, { itemName, quantity, category }, { new: true });
        if (!updatedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json(updatedInventoryItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete an inventory item by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedInventoryItem = await InventoryItem.findByIdAndDelete(req.params.id);
        if (!deletedInventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
