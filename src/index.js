import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./dbconfig/dbConnect.js";
import router from "./routes/user.route.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config({
    path: "./config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "6626b1dbc5b52a0008ffe5d9--rpm-chat-front.netlify.app",
        credentials: true,
    })
);

connectDB()
    .then(() => {
        const server = http.createServer(app);

        server.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });

        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true,
            },
        });

        const usersMap = new Map(); // Map to store username to socket ID mapping

        io.on("connection", (socket) => {
            console.log("a user connected", socket.id);

            socket.on("username", (username) => {
                // Associate the username with the socket ID
                usersMap.set(username, socket.id);
                console.log("Username:", username, "Socket ID:", socket.id);
                console.log("Users Map: ", usersMap);
            });

            socket.on("selectedUser", (data) => {
                console.log("User selected:", data.userId);
                socket.join(data.userId); // Join room with selected user ID
            });

            socket.on("sendMessage", ({ from, to, message }) => {
                // Get the recipient's socket ID using their username
                const toSocketId = usersMap.get(to);
                if (toSocketId) {
                    // If recipient's socket ID is found, emit the message to that socket
                    io.to(toSocketId).emit("message", { from: from, message });
                } else {
                    // Handle case when recipient's socket ID is not found
                    console.log("Recipient not found:", to);
                }
            });

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
                // Remove the username from the mapping when the user disconnects
                usersMap.forEach((value, key) => {
                    if (value === socket.id) {
                        usersMap.delete(key);
                    }
                });
            });
        });
    })
    .catch((error) => {
        console.log("something went wrong in the db", error);
        process.exit(1);
    });

app.use("/api/v1/user", router);

app.get("/", (req, res) => {
    res.send("Hello World");
});
