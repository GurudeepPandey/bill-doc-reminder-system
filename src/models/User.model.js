import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    avatar: {
        type: {
            url: String,
            localpath: String,
        },
        default: {
            url: "https://placehold.co/600x400",
            localpath: ""
        }
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpiry: {
        type: Date
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;