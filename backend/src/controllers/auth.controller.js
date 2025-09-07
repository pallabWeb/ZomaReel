const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// User Registration Controller
async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token);

    res.status(201).json({ 
        message: 'User registered successfully',
        user: { id: user._id, email: user.email, fullName: user.fullName }
     });
}

// User Login Controller
async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token);
    res.status(200).json({ 
        message: 'Login successful',
        user: { id: user._id, email: user.email, fullName: user.fullName }
     });
}

// User Logout Controller
async function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

// Food Partner Registration Controller
async function registerFoodPartner(req, res) {
    const { fullName, email, password } = req.body;

    const isPartnerExist = await foodPartnerModel.findOne({ email });
    if (isPartnerExist) {
        return res.status(400).json({ message: 'Food Partner already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        fullName,
        email,
        password: hashedPassword
    });
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token);

    res.status(201).json({ 
        message: 'Food Partner registered successfully',
        foodPartner: { id: foodPartner._id, email: foodPartner.email, fullName: foodPartner.fullName }
     });

}

// Food Partner Login Controller
async function loginFoodPartner(req, res) {
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)
    res.cookie('token', token);
    res.status(200).json({ 
        message: 'Login successful',
        foodPartner: { id: foodPartner._id, email: foodPartner.email, fullName: foodPartner.fullName }
     });
}

// Food Partner Logout Controller
async function logoutFoodPartner(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };