import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc   GET all users
// @route  GET /api/v1/users
// @access Private/Admin -- it's private AND you have to be an admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}); // an empty obj is passed to get ALL users
    res.json(users);
})

// @desc   Authenticate a user
// @route  POST /api/v1/users/login
// @access Public
const authenticateUser = asyncHandler(async (req, res) => {
    // console.log(Object.keys(req));
    // console.log(req.url);
    // console.log(req.query);
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password.")
    }
})

// @desc   Register a new user
// @route  POST /api/v1/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, username, email, password } = req.body;
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("Email already taken.");
    }

    const user = await User.create({
        name,
        username,
        summary: 'Write your User Summary!',
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data.");
    }
})

// @desc   Get user profile
// @route  GET /api/v1/users/:id
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export {
    getUsers,
    authenticateUser,
    registerUser,
    getUserProfile
}