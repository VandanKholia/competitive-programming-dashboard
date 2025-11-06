import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import { log } from './utils/logger.js';
import authRoutes from './routes/auth.js';
import codechefRouter from './routes/codechefRouter.js'
import codeforcesRouter from './routes/codeforcesRouter.js'
import cookieParser from 'cookie-parser';
import leetcodeRouter from './routes/leetcodeRouter.js';
import platformRouter from './routes/platformRouter.js';
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true, 
  legacyHeaders: false,
});
// app.use('/api', apiLimiter);

mongoose.connect(process.env.MONGO_URI)
    .then(()=> log("Connected to mongoDB"))
    .catch(err=> console.error("Failed to connect to mongoDB ", err))

// app.use('/api/auth',authRoutes);
// app.use('/api/leetcode',leetcodeRouter)
// app.use('/api/codeforces',codeforcesRouter)
// app.use('/api/codechef',codechefRouter);
// app.use('/api', platformRouter);

app.use('/api/auth',authRoutes);
app.use('/api/leetcode',apiLimiter, leetcodeRouter)
app.use('/api/codeforces',apiLimiter, codeforcesRouter)
app.use('/api/codechef',apiLimiter, codechefRouter);
app.use('/api', platformRouter);

// health check for Render / CI
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});



const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    log(`server running on port ${port}`)
})