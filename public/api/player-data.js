// File: pages/api/player-data.js

export default function handler(req, res) {
    // Mock data for now (replace with actual server-side data later)
    res.status(200).json({ username: "Steve", balance: 5000 });
}
