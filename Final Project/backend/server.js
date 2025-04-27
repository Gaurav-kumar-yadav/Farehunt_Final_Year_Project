const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Import node-fetch

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/fare', async (req, res) => {
    const distance = req.query.distance;
    if (!distance) {
        return res.status(400).json({ error: "Distance parameter is required" });
    }

    try {
        const response = await fetch(`https://fair.naz.com.np/api/index.php?distance=${distance}`);
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch fare data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
