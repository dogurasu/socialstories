import express from 'express';
import {
    getUsers,
    authenticateUser,
    registerUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

router.post('/login', authenticateUser);

export default router