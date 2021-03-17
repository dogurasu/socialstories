import asyncHandler from "express-async-handler";
import Story from "../models/storyModel.js";

// @desc   Get all Stories
// @route  GET /api/v1/stories
// @access Public
const getStories = asyncHandler(async(req, res, next) => {
    try {
        // const stories = await Story.find({});
        res.json(await Story.find({}));
    } catch(err) {
        console.log(`Error: ${err}`);
    }
})

// @desc   Get Story by ID
// @route  GET /api/v1/stories/:id
// @access Public
const getStoryById = asyncHandler(async(req, res, next) => {
    const storyId = req.params.storyId;
    if (storyId) {
        const story = await Story.findById(storyId);
        res.json(story);
    } else {
        res.status(404);
        throw new Error("Story not found");
    }
})

// @desc   Delete Story by ID
// @route  Delete /api/v1/stories/:id
// @access Private/Admin
const deleteStory = asyncHandler(async(req, res, next) => {
    const story = await Story.findById(req.params.storyId);
    await story.remove();
    res.json({msg: "Story deleted"})
})

// @desc   Update Story by ID
// @route  Update /api/v1/stories/:id
// @access Private/Admin
const updateStory = asyncHandler(async(req, res, next) => {
    
})

export {
    getStories,
    getStoryById,
    deleteStory,
    updateStory
}