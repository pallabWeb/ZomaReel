const foodsModel = require('../models/foods.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

// Create a new food item
async function createFood(req, res) {
    console.log(req.foodPartner);

    console.log(req.body);
    console.log(req.file);

    const fileUloadResult = await storageService.uploadFile(req.file.buffer, uuid());


    const foodItem = {
        name: req.body.name,
        description: req.body.description,
        video: fileUloadResult.url,
        foodPartner: req.foodPartner._id
    };
    
    res.status(201).json({
        message: 'Food item created successfully',
        food: foodItem
    });
}

async function getAllFoods(req, res) {
    const foodItems =  await foodsModel.find({})
    res.status(200).json({
        message: 'Food items retrieved successfully',
        foodsItems: foodItems
    });
}
module.exports = { createFood, getAllFoods };