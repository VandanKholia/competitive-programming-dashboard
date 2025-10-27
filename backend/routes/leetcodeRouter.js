import express from "express";
import leetcodeController from "../controller/leetcodeController.js";

const router = express.Router();

router.get('/:username', async (req,res) => {
    const username = req.params.username;
    try {
        const data = await leetcodeController(username);
        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(data);
    } catch(err) {
        return res.status(500).json({ error: 'Failed to fetch LeetCode data' });
    }
    
});
export default router;