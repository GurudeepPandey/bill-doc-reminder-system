import User from "../models/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {

    // get data from user
    const { name, email, password, phone } = req.body;

    // validate data
    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            message: "All feilds are required"
        })
    }
    console.log(email)

    // validate password and email

    // check if user already exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists, try to login"
            })
        }

        // if not, create user in database
        const user = await User.create({
            name,
            email,
            password,
            phone
        })
        console.log("New User: ", user)
        if (!user) {
            return req.status(400).json({
                message: "User not created due to database error"
            })
        }

        // create a verification token
        const token = crypto.randomBytes(32).toString("hex")
        console.log(token);

        // save token in database
        user.emailVerificationToken = token
        await user.save()

        // send token as email to user
        const transporter = nodemailer.createTransport({
            host: process.env.BREVO_HOST,
            port: process.env.BREVO_PORT,
            secure: false,
            auth: {
                user: process.env.BREVO_USERNAME,
                pass: process.env.BREVO_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.BREVO_SENDEREMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Verify your email", // Subject line
            text: `Please click the following link to verify your email: ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain text body
            html: "<b>Hello world?</b>", // html body
        }
        console.log("new email: ", user.email);
        await transporter.sendMail(mailOptions);

        // send success status to user
        return res.status(200).json({
            message: "User created successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "User not registered due to code error",
            error,
            success: false
        })
    }
}

const verifyUser = async (req, res) => {
    // get token from url
    const { token } = req.params;
    console.log("Verify token send by user: ", token)

    // validate token
    if (!token) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }

    // find user in database based on token
    const user = await User.findOne({ verificationToken: token })

    // if not
    if (!user) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }

    // set isVerified feild to true
    user.isVerified = true;

    // remove verificationToken feild
    user.emailVerificationToken = null;

    // save
    await user.save();

    // return response
    return res.status(200).json({
        message: "User verified successfully"
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "All feilds are required"
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "user not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({
                value: isMatch,
                message: "Invalid email or password"
            });
        }


        // check user verified hai ki nahi

        const jwtToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }
        res.cookie("token", jwtToken, cookieOptions)

        res.status(200).json({
            success: true,
            message: "Login Successful",
            jwtToken,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error in login functionality"
        })
    }
}

const getMe = async (req, res) => {
    try {
        if (!req.user.id) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        const user = await User.findById(req.user.id).select("-password");
        console.log("user: ", user);
        console.log("Testing")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        return res.status(200).json({
            success: true,
            userDate: user
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error in getMe functionality"
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0)
        })
        res.status(200).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error in logout functionality"
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        // get email from user
        // find user based on email
        // reset token + reset expiry => Date.now() + 10 * 60 * 1000
        // send email => design url + token
    } catch (error) {

    }
}

const resetPassword = async (req, res) => {
    try {
        // collect token from params
        // collect password from body
        const {token} = req.params;
        const {password} = req.body;

        try {
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpire: { $gt: Date.now() }
            })
            // set password in user
            // reset token + reset expiry => undefined
            // save
        } catch (error) {
            
        }
    } catch (error) {

    }
}

export {
    registerUser,
    verifyUser,
    loginUser,
    getMe,
    logoutUser,
    forgotPassword,
    resetPassword
};