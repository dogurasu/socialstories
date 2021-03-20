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
    const emailTaken = await User.findOne({email});
    const userTaken = await User.findOne({username});
    if (emailTaken) {
        res.status(400);
        throw new Error("Email already taken.");
    }
    if (userTaken) {
        res.status(400);
        throw new Error("Username already taken.")
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
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    // console.log(req.user);
    // const user = await User.findById(req.params.id);
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            username: req.user.username,
            email: req.user.email,
            summary: req.user.summary,
            userImage: req.user.userImage,
            isAdmin: req.user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    try {
        await User.updateOne(
            {"_id": req.params.id},
            {
                $set: {"email": req.body.email, "summary": req.body.summary},
                $currentDate: {lastModified: true}
            }
        )
        const user = await User.findOne({"_id": req.params.id});
        // console.log(user);
        res.status(200).json({message: "success", email: user.email, summary: user.summary});
        // res.json({status: 200, })
    } catch(err) {
        res.status(400).json({message: "fail"});
    }
})

export {
    getUsers,
    authenticateUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
}