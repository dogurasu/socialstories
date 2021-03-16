import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import stories from './data/stories.js';
import User from './models/userModel.js';
import Story from './models/storyModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // clear all previous data for a reset
        await User.deleteMany();
        await Story.deleteMany();

        // insert user data
        const createdUsers = await User.insertMany(users);

        // we need to establish a connection between users and the stories they've authored
        stories[0] = {...stories[0], user: createdUsers[0]._id}
        stories[1] = {...stories[1], user: createdUsers[0]._id}
        stories[2] = {...stories[2], user: createdUsers[1]._id}
        stories[3] = {...stories[3], user: createdUsers[2]._id}
        await Story.insertMany(stories);

        console.log('Data Imported!'.green.inverse)
        process.exit();
    } catch(err) {
        console.error(`Error in importData: ${err}`.red.inverse)
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Story.deleteMany();

        console.log('Data Destroyed!'.red.inverse)
        process.exit();

    } catch(err) {
        console.error(`${error}`.red.inverse)
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}