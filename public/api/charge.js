// File: pages/api/charge.js

export default function handler(req, res) {
    const { username, amount } = req.body;

    if (amount > 5000) {
        return res.status(400).json({ success: false, message: "Not enough balance" });
    }

    // Simulate successful charge
    res.status(200).json({ success: true, message: "Balance deducted" });
}
