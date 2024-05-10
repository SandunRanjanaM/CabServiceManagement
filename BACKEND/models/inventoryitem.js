// models/InventoryItem.js
const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
