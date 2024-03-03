const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  carBrand: {
    type: String,
    trim: true,
    required: true,
  },
  carModel: {
    type: String,
    trim: true,
    required: true,
  },
  stageSix: {
    type: Number,
    trim: true,
    required: false,
    default: 0
  },
  fusionParts: {
    type: Number,
    trim: true,
    required: false,
    default: 0
  },
  carValue: {
    type: Number,
    trim: true,
    required: true,
  },
  askPrice: {
    type: String,
    trim: true,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
