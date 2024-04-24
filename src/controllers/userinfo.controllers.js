// import { User } from "../models/user.model.js";
// import { jwt_decode } from "jwt-decode";
import jwt from "jsonwebtoken";

const userinfo = async (req, res) => {
    try {
        console.log("Request Headers:", req.headers);

        let token;

        // Check for token in headers
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            // Extract token from Authorization header
            token = req.headers.authorization.split(" ")[1];
        } else {
            // If token is not found in headers, check local storage or session storage
            // Retrieve token from local storage or session storage
            token = req.body.token; // Adjust this based on how you want to pass the token from the frontend
        }

        console.log("token: ", token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify and decode the token to obtain user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decoded);

        // Extract user ID, username, and email from the decoded token payload
        const { userId, username, email } = decoded;

        return res.json({ userId, username, email });
    } catch (error) {
        console.log(error);
    }
};

export default userinfo;
