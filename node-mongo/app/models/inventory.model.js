const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  carBrand: String,
  carModel: String,
  stageSix: Number,
  fusionParts: Number,
  carValue: Number,
  askPrice: Number,
});

module.exports = mongoose.model('Inventory', InventorySchema);
