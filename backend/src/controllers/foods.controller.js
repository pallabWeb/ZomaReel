const foodsModel = require('../models/foods.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

// Create a new food item
async function createFood(req, res) {
    try {
        console.log("Food Partner:", req.foodPartner);
        console.log("Body:", req.body);
        console.log("File:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload file to ImageKit
        const fileUploadResult = await storageService.uploadFile(
            req.file.buffer.toString("base64"), // convert buffer → base64
            uuid()
        );

        // Save food item in DB
        const foodItem = await foodsModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: 'Food item created successfully',
            food: foodItem
        });
    } catch (error) {
        console.error("Error creating food:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get all food items
async function getAllFoods(req, res) {
    try {
        const foodItems = await foodsModel.find({})
            .populate('foodPartner', 'fullName email'); // populate partner info

        res.status(200).json({
            message: 'Food items retrieved successfully',
            foodsItems: foodItems
        });
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { createFood, getAllFoods };