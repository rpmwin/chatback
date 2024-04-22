
import bcrypt from "bcrypt";
import { sendEmail } from "../../helpers/mailer.js";
import { User } from "../../models/user.model.js";



const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        user.save();

        console.log("user created and saved Successfully", user);

        await sendEmail({ email, userId: user._id });

        return res
            .status(201)
            .json({ message: "user created and saved Successfully" });
    } catch (error) {
        console.log(" something went wrong in the register controller ", error);
    }
};

export default signup;
