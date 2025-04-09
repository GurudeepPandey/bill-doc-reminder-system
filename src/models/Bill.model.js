import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    billName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paymentDate: {
        type: Date
    }
}, { timestamps: true });

const Bill = mongoose.model("Bill", billSchema);

export default Bill;