import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js.js';

// import API router (routes)
import userRoutes from './routes/userRoutes.js';

// database and env config
dotenv.config();
connectDB();

// app setup
const env = process.env.NODE_ENV;
const port = process.env.PORT;
const app = express();

// mount 'em routes
app.use('/api/v1/users', userRoutes);
app.use(express.json()); // hook up express.json middleware to accept JSON data in req.body
if (env === "development") {
    // dev gives us http methods, status, etc
    app.use(morgan('dev')); 
}

// mount routes
app.get('/', function (req, res) {
    res.send("Hello World!");
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})