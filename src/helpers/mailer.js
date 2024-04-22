import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const sendEmail = async ({ email, userId }) => {
    try {
        const token = await bcrypt.hash(userId.toString(), 10);


        await User.findByIdAndUpdate(userId, {
            verifyToken: token,
            verifyTokenExpiry: Date.now() + 3600000,
        });


        const transporter = nodemailer.createTransport({
            host: "mailslurp.mx",
            port: 2587,
            secure: false,
            auth: {
                user: "ConM7ElPfmXxT4vSglsnEz5rKT9s8K9p",
                pass: "SAWFEorhmL2Yn9hMtXqqAYGFdUistxxg",
            },
        });

        const emailInfoSent = await transporter.sendMail({
            from: '"from rpm👻" <iamrpm@example.com>',
            to: email,
            subject: "verify your email",
            text: "please click on the link below to verify your email and continue to use our services",
            html: ` copy paste the link in your browser ${process.env.DOMAIN}/api/verifyemail?token=${token}</p>`,
        });

        console.log("email sent", emailInfoSent);
    } catch (error) {
        console.log("error in sending email", error);
    }
};
