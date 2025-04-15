import Bill from "../models/Bill.model.js";


const addBill = async (req, res) => {
    try {
        const { billName, amount, dueDate, category, recurringPeriod } = req.body;
        const userId = req.user.id;

        if(!billName || !amount || !dueDate || !category || !recurringPeriod) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const newBill = new Bill({
            userId,
            billName,
            amount,
            dueDate,
            category,
            frequency: recurringPeriod
        })

        if (!newBill) {
            return res.status(400).json({
                success: false,
                message: "Failed to add bill due to database error"
            })
        }

        await newBill.save();

        return res.json({
            success: true,
            message: "Bill added successfully",
            data: { billName, amount, dueDate, category, recurringPeriod, userId }
        })

    } catch (error) {
        res.status(500).json({ message: "Failed to add bill", error: error.message });
    }
};

const markAsPaid = async (req, res) => {
    try {
      await Bill.findByIdAndUpdate(req.params.id, { dueDate: new Date() }); // Optional: you might want to add a "paid" flag or move it to a paid section
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ message: "Error marking bill as paid" });
    }
  };

export { addBill };