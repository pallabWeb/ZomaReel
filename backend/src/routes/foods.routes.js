const express = require('express');
const foodsController = require('../controllers/foods.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload  = multer({
    storage: multer.memoryStorage()
})

// Food routes here /api/foods/  [Protected routes only for food partners]
router.post('/', authMiddleware.authenticateFoodPartner, upload.single("video"), foodsController.createFood);


// GET /api/foods/ - Get all food items (Protected)
router.get('/', authMiddleware.authenticateUser, foodsController.getAllFoods);

module.exports = router;