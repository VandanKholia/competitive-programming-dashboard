import express from "express";
import { authenticateJWT } from "../middlewares/authMiddleware.js";
import { setPlatforms, getPlatforms } from "../controller/platformController.js";

const router = express.Router();

router.post("/platforms", authenticateJWT, setPlatforms);
router.get("/platforms", authenticateJWT, getPlatforms);

export default router;
