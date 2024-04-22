const setcookies = async (req, res) => {
    try {
        res.cookie("token", "12345", {
            httpOnly: true,
            path: "/", // or specify a specific path if needed
            domain: "localhost", // or your domain
            secure: true, // or true if HTTPS is enabled
        });
        res.send("Cookie set successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export default setcookies;
