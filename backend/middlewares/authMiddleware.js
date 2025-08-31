import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const authenticateJWT = async(req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if(!token) {
      return res.status(401).json({message: "Access token missing"});
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?.id);
  
    if(!user) {
      return res.status(401).json({message: "Invalid access token"});
    }
    req.user = user;
    next();
  } catch (error) {
      return res.status(401).json({message: error?.message || "Invalid access token"});
  }
};

// export const authenticateJWT = async(req,res,next) => {
//     const token = req.cookies?.accessToken;

//     if(!token) {
//         return res.status(401).json({ message: 'Access token missing' });
//     }

//    try {
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         req.user = await User.findById(decoded.id).select("-password -refreshToken");
//         if (!req.user) {
//             return res.status(401).json({ message: "User not found" });
//         }
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid token" });
//     }
// }