import bcrypt from "bcrypt";
import User from "../model/userModel.js";

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
export const signup = async(req,res)=> {
    try {
         const { name, email, password } = req.body;
        console.log(name + " " + email + " " + password);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password});

        await newUser.save();
        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
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
        res.status(200).json({ message: 'Login successful',user: {
            email: user.email,
            name: user.name,
            platforms: user.platforms,
        } });
    } catch (err) {
        console.log('Login error:', err);
        res.status(500).json({ message: 'Server error', });
    }
}

export const platforms = async (req,res) => {
     try {
        const { email, platforms } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.platforms = platforms;
        await user.save();
        res.status(200).json({ message: "Platforms saved successfully" });
    } catch (err) {
        console.error("Platform save error:", err);
        res.status(500).json({ message: "Server error" });

    }
}