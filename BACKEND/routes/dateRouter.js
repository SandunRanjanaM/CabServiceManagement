const express = require('express');
const router = express.Router();

router.post('/calculateEndDate', (req, res) => {
    const { startDate, timePeriod } = req.body;
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + parseInt(timePeriod));
    res.json({ endDate: endDate.toISOString().slice(0, 10) });
});

module.exports = router;
