import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.accessToken;
  console.log("🟢 Cookie token received:", token);

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("🔴 JWT verification failed:", err.message);
      return res.status(403).json({ message: "Invalid access token" });
    }
    console.log("✅ JWT verified, user payload:", user);
    req.user = user;
    next();
  });
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