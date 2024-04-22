const checkcookies = async (req, res) => {
    try {

        console.log("Request Headers:", req.headers);

        // Obtain the cookie from the request
        const token = req.cookies.token;

        // Log the cookie value
        console.log("Cookie value:", token);

        // Respond with a success message
        res.send("Cookie received and logged successfully");
    } catch (error) {
        // Handle errors
        console.error("Error obtaining cookie:", error);
        res.status(500).send("Internal Server Error");
    }
};

export default checkcookies;
