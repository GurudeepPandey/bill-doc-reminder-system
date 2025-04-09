import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    documentName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    isRenewed: {
        type: Boolean,
        default: false
    },
    fileUrl: {
        type: String,
    }

}, { timestamps: true });

const Document = mongoose.model("Document", documentSchema);

export default Document;