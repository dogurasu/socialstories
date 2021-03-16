import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
// import generateToken from '../utils/generateToken.js';

// @desc   GET all users
// @route  GET /api/v1/users
// @access Private/Admin -- it's private AND you have to be an admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}); // an empty obj is passed to get ALL users
    res.json(users);
})



// @desc GET user profile
// @route GET /api/v1/users/profile
// @access

export {
    getUsers
}