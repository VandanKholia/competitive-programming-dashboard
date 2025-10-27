import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import { ClientSession } from "mongodb";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        res.status(500).json({ message: "Error generating tokens" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
        const isProd = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax'
        }

        return res.status(200)
          .cookie("accessToken", accessToken, cookieOptions)
          .cookie("refreshToken", refreshToken, cookieOptions)
          .json({
            message: "Login Successful",
            user: {id: user._id, email: user.email}
        });

    } catch (err) {
        console.log('Login error:', err);
        res.status(500).json({ message: 'Server error', });
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id)
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200).cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            message: "User created successfully",
            user: {userId: newUser._id, email:email,accessToken: accessToken}
        });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
};




export const logout = async (req, res) => {
    User.findByIdAndUpdate(
        req.user.id,
        {
            $unset: { refreshToken: 1 }
        }, 
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);
    res.status(200).json({ message: "Logged out successfully" });
};

export const refreshAccessToken = async (req, res) => {

    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const accessToken = user.generateAccessToken();
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (err) {
        console.error("Refresh token error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

// export const platforms = async (req, res) => {
//   try {
//     // user id/email comes from the JWT middleware
//     const userId = req.user.id; // or req.user.email if you signed with email
//     const { platforms } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.platforms = platforms;
//     await user.save();

//     res.status(200).json({ message: "Platforms saved successfully" });
//   } catch (err) {
//     console.error("Platform save error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const platforms = async (req,res) => {
//      try {
//         const { email, platforms } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         user.platforms = platforms;
//         await user.save();
//         res.status(200).json({ message: "Platforms saved successfully" });
//     } catch (err) {
//         console.error("Platform save error:", err);
//         res.status(500).json({ message: "Server error" });

//     }
// }