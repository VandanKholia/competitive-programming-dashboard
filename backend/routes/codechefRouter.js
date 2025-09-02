import express from 'express';
import codechefController from '../controller/codechefController.js';
const router = express.Router();


router.get('/:username', async (req,res) => {
    const username = req.params.username;
    try {
        const data = await codechefController(username);
        return res.json(data);
    } catch(err) {
        return res.status(500).json({ error: 'Failed to fetch codechef data' });
    }
    
});

export default router;
