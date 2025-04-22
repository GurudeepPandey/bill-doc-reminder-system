import User from '../models/User.model.js';
import Bill from '../models/Bill.model.js';
import Document from '../models/Document.model.js';
import dayjs from 'dayjs';
import sendMessage from './sendMessage.js';

export async function sendReminders() {
    try {
        const users = await User.find();

        for (const user of users) {
            const bills = await Bill.find({ userId: user._id });
            const documents = await Document.find({ userId: user._id });

            const upcomingBills = bills.filter(bill => {
                const daysLeft = dayjs(bill.dueDate).diff(dayjs(), 'day');
                return daysLeft >= 0 && daysLeft <= 3;
            });

            const expiringDocs = documents.filter(doc => {
                const daysLeft = dayjs(doc.expiryDate).diff(dayjs(), 'day');
                return daysLeft >= 0 && daysLeft <= 3;
            });

            if (upcomingBills.length || expiringDocs.length) {
                const message = `
                    Hi ${user.name}, 
                    You have:
                    • ${upcomingBills.length} upcoming bill(s) due soon
                    • ${expiringDocs.length} document(s) expiring soon.
                    – PaySphere`;

                await sendMessage(user.phone, message);
                console.log(`SMS sent to ${user.phone}`);
            }
        }
    } catch (error) {
        console.error('Error sending reminders:', error.message);
    }
}
