const logout = async (req, res) => {
    try {
        const response = res.json({
            message: "user logged out successfully",
            status: 200,
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

export default logout;
