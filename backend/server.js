import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import codechefRouter from './routes/codechefRouter.js'
import codeforcesRouter from './routes/codeforcesRouter.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("Connected to mongoDB"))
    .catch(err=>console.log("Failed to connect to mongoDB ",err))

app.use('/api/auth',authRoutes);
app.use('/api/codeforces',codeforcesRouter)
app.use('/api/codechef',codechefRouter);


// async function fetchCodeforcesData(userName) {
//  const url = `${process.env.CODEFORCES_URL}${userName}`;
//     let response = await fetch(url);
//     let data = await response.json();
//     return data;
// }


// app.get('/api/codeforces/:username', async(req, res) => {
//     const userName = req.params.username;
//     let data = await fetchCodeforcesData(userName);
//     res.json(data);
// })

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})