const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/add', (req, res) => {

    const filePath = path.join(__dirname, '../views/add-car.html');
    res.sendFile(filePath);
});
module.exports = router;