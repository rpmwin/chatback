import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // Import cookie-parser module

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create JWT payload
        const tokenPayload = {
            userId: user._id,
            username: user.username,
            email: user.email,
        };

        // Generate JWT token
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Send JWT token in response headers
        res.setHeader("Authorization", "Bearer " + token);

        // Send user information along with token (optional)
        return res.json({
            success: true,
            message: "User logged in successfully",
            token: token,
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("Something went wrong in the login controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default login;
