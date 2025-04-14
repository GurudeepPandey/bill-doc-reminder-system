import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
    try {
        console.log("Cookies: ", req.cookies);

        // let token = req.cookies.token || "";
        let token = req.cookies?.token;
        console.log("Token found: ", token ? "YES" : "NO");

        if (!token) {
            console.log("No Token")
            res.redirect("/");
            // return res.status(401).json({
            //     success: false,
            //     message: "user not logged in"
            // })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded data: ", decoded)
        req.user = decoded
        next()

    } catch (error) {
        console.log("Auth middleware failure");
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        next()
    }
}