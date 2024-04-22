import { User } from "../../models/user.model.js";

export const verifyEmail = async (req, res) => {
    try {
        
        const { token } = req.body;

        console.log(token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return res.status(200).json({ message: "user verified successfully" });
    } catch (error) {
        console.log(" error occured in verify email", error);
    }
};
