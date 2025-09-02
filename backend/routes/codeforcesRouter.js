import express from 'express';
import codeforcesController from '../controller/codeforcesController.js';
const router  = express.Router();

router.get('/:username', async(req,res)=> {
    const userName = req.params.username;
    try{
        const data = await codeforcesController(userName);
        res.json(data);
    }catch (err) {
        res.status(500).json({ error: 'Failed to fetch Codeforces data' });
    }
    
});
export default router;