import express from "express";
import fetchLeetcodeData from "../controller/leetcodeController.js";

const router = express.Router();

router.get('/:username', async (req,res) => {
    const username = req.params.username;
    try {
        const data = await fetchLeetcodeData(username);
        res.json(data);
    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch Codeforces data' });
    }
    
});
export default router;