import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import { ClientSession } from "mongodb";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async(userId)=> {
    try {
        const user = await User.findById(userId);
        const accessToken =  user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return { accessToken, refreshToken };
    } catch (error) {
        res.status(500).json({ message: "Error generating tokens" }); 
    }
}

export const login = async(req,res)=> {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
        res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
        res.status(200).json({ 
            message: 'Login successful',user: {
            email: user.email,
            name: user.name,
            platforms: user.platforms,
        } });

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

        // Generate tokens for the new user
        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();
        newUser.refreshToken = refreshToken;
        await newUser.save();

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ message: "User created and logged in" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// export const signup = async(req,res)=> {
//     try {
//          const { name, email, password } = req.body;
//         console.log(name + " " + email + " " + password);

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//         const newUser = new User({ name, email, password});

//         await newUser.save();
//         res.status(201).json({ message: "User created successfully" })
//     } catch (err) {
//         console.error('Signup error:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// }



export const logout = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if(refreshToken) {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
            user.refreshToken = null;
            await user.save({ validateBeforeSave: false });
        }
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ message: "Logged out successfully" });
};

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if(!refreshToken) {
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
            sameSite: 'strict',
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