import Bill from "../models/Bill.model.js";
import User from '../models/User.model.js';
import Document from '../models/Document.model.js';
import BillHistory from '../models/History.model.js';

const showBillsPage = async (req, res) => {
    try {
        const bills = await Bill.find({ userId: req.user.id })
        res.render("pages/bills", { bills })
    } catch (error) {
        res.status(500).json({ message: "Error in showBillsPage" })
    }
}

const showDashboardPage = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch data from MongoDB
        const user = await User.findById(userId);
        const bills = await Bill.find({ userId });
        const paidBills = bills.filter(b => b.status === 'paid');
        const dueBills = bills.filter(b => b.status === 'due');
        const upcomingBills = bills.filter(b => b.status === 'upcoming');
        const recentPayments = paidBills.slice(-4).reverse();
        const expiringDocs = await Document.find({ userId, isExpiringSoon: true });

        // Calculate totals
        const totalBillsAmount = bills.reduce((sum, b) => sum + b.amount, 0);
        const paidAmount = paidBills.reduce((sum, b) => sum + b.amount, 0);
        const dueAmount = dueBills.reduce((sum, b) => sum + b.amount, 0);

        console.log(recentPayments);

        res.render('pages/dashboard', {
            user,
            totalBillsAmount,
            paidAmount,
            dueAmount,
            recentPayments,
            dueBills,
            upcomingBills,
            expiringDocs
        });
    } catch (error) {
        res.status(500).json({ message: 'Error in showDashboardPage' });
    }
};

const showHistoryPage = async (req, res) => {
    try {
        const history = await BillHistory.find({ userId: req.user.id });
        res.render('pages/history', { history });
    } catch (error) {
        res.status(500).json({ message: 'Error in showHistoryPage' });
    }
}
export { showBillsPage, showDashboardPage, showHistoryPage };