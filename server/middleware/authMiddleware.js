import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    console.log(Object.keys(req));

    // if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    //     try {
    //         token = req.headers.authorization
    //     }
    // }
})

const admin = (req, res, next) => {
    console.log(Object.keys(req));
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Unauthorized as Admin.");
    }
}

export { protect, admin};