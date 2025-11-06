import express from 'express';
import codeforcesController from '../controller/codeforcesController.js';
const router  = express.Router();

router.get('/:username', async(req,res)=> {
    const userName = req.params.username;
    try{
        const data = await codeforcesController(userName);
        if(data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Codeforces user not found' });
        }
    }catch (err) {
        res.status(500).json({ error: 'Failed to fetch Codeforces data' });
    }
    
});
export default router;