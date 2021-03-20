import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Story from '../models/storyModel.js';

const protect = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedId = jwt.verify(token, process.env.JWT_SECRET);

            // user is the returned "document" from the User model query
            // assign it to the request object so that it gets passed on to the 'admin' middleware
            req.user = await User.findById(decodedId.id).select("-password");
            next();
        } catch(err) {
            res.status(401);
            throw new Error("Not authorized: token found but failed");
        }
    } else {
        res.status(401);
        throw new Error("Token not found");
    }
})

const restrictUserAccess = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // decode token to user ID to see if request author has authorization
            const token = req.headers.authorization.split(" ")[1];
            const decodedId = jwt.verify(token, process.env.JWT_SECRET).id;
            // console.log(decodedId);

            // get story credentials and owner
            const story = await Story.findById(req.params.storyId);
            // console.log(story.user);

            // query admin and owner of story
            const admin = await User.find({});
            // console.log(admin[0].id);

            // check if the person making the request is the author or an admin
            if (decodedId === story.user.id || decodedId === admin[0].id) {
                next();
            } else {
                res.status(401);
                throw new Error("Not authorized: user is not admin/author")
            }
        } catch(err) {
            res.status(401);
            throw new Error("Not authorized: token found but failed");
        }
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Unauthorized as Admin.");
    }
}

export { protect, restrictUserAccess, admin};