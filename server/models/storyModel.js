import mongoose from 'mongoose';

// we can have the commentSchema in the same file because it's small and
// very related to the storySchema
const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
}, {
    timestamps: true,
})

const storySchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    authorName: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [{type: String}],
    comments: [commentSchema],
    image: {
        type: String
    }
}, {
    timestamps: true
})

const Story = mongoose.model("Story", storySchema)
export default Story;