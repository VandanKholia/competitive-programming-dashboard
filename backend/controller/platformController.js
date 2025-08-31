import User from "../model/userModel.js"

export const setPlatforms = async (req, res) => {
  try {
    const userId = req.user.id;
    const { platforms } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.platforms = platforms;
    await user.save();

    res.status(200).json({ message: "Platforms saved successfully", platforms: user.platforms });
  } catch (err) {
    console.error("Platform save error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPlatforms = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId).select("platforms");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ platforms: user.platforms });
  } catch (err) {
    console.error("Get platforms error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

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