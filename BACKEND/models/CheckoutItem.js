// models/CheckoutItem.js
const mongoose = require('mongoose');

const checkoutItemSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  paymentNumber: {
    type: String,
    required: true
  }
});

const CheckoutItem = mongoose.model('CheckoutItem', checkoutItemSchema);

module.exports = CheckoutItem;
