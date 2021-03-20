import express from 'express';
import {
    getUsers,
    registerUser,
    getUserProfile,
    authenticateUser,
    updateUserProfile,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

router
    .post('/login', authenticateUser)

router
    .route('/:id')
    .get(protect, getUserProfile)
    .post(protect, updateUserProfile)

export default router