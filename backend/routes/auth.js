import express from 'express';
import bcrypt from 'bcrypt';
import User from '../model/userModel.js';
import { login,logout,refreshAccessToken,signup } from '../controller/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
const router = express.Router()


router.post('/signup', signup);
router.post('/login', login);
// router.post('/platforms', platforms);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logout);

router.get('/user', authenticateJWT, async (req,res) => {
     try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({
            email: user.email,
            name: user.name,
            platforms: user.platforms
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

export default router;