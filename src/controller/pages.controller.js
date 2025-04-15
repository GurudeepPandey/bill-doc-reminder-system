import Bill from "../models/Bill.model.js";

const showBillsPage = async (req, res) => {
    try {
        const bills = await Bill.find({ userId: req.user.id })
        console.log(bills);
        res.render("pages/bills", { bills })
    } catch (error) {
        res.status(500).json({ message: "Error in showBillsPage" })
    }
}

export { showBillsPage };