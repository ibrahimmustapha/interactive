const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/contact', (req, res, next) => {
res.render('contact');
})
// Fetch data from mysql database
router.post('/submit', (req, res) => {
    const yname = req.body.yname;
    const email = req.body.email;
    const message = req.body.message;
        const sql = "INSERT INTO contactus (name, email, message) VALUES ('" +yname+ "', '" + email + "',  '" + message + "')";
        database.query(sql, (err, result) => {
            if (err) throw err;
            loger('data inserted successfully!');
            res.end();
    });
    res.sendFile('views/contact.html', {root: __dirname});
});

module.exports = router;