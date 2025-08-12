import express from 'express';
import bcrypt from 'bcrypt';
import User from '../model/userModel.js';
import { login,platforms,signup } from '../controller/authController.js';
const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/platforms', platforms);

export default router;