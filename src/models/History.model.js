import mongoose from "mongoose";

const billHistorySchema = new mongoose.Schema({
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        enum: ['marked_as_paid'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: Number,
    billName: String,
    dueDate: Date
});

export default mongoose.model('BillHistory', billHistorySchema);