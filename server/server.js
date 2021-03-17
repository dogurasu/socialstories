import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// import API router (routes)
import userRoutes from "./routes/userRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

// database and env config
dotenv.config();
connectDB();

// app setup
const env = process.env.NODE_ENV;
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// mount 'em routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/stories", storyRoutes)
app.use(express.json()); // hook up express.json middleware to accept JSON data in req.body

// hook up morgan if in a development environment
if (env === "development") {
    // dev gives us http methods, status, etc
    app.use(morgan('dev')); 
}

// catches any mishap (invalid request, page not found) and logs it
app.use(notFound);
app.use(errorHandler);

app.listen(port, function() {
    console.log(`Server running in a ${env} environment on http://localhost:${port}`.yellow.bold);
})