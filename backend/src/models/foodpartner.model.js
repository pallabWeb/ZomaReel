const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const FoodPartner = mongoose.model('FoodPartner', foodPartnerSchema);

module.exports = FoodPartner;