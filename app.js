const http = require('http');
const express = require('express');
const { PassThrough } = require('stream');
const app =  express();
const path = ('path');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const { compileFunction } = require('vm');
const database = require('./database');
const con = require('./database');
const hostname = '127.0.0.1';
const port = 2000;
const loger = console.log;
const ejs = require('ejs');
const Cryptr = require('cryptr');
cryptr = new Cryptr('devnami');

const urlencodedParser = bodyparser.urlencoded({extend: false});
app.use(express.static(__dirname + '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.static('views'));

// Inserting data into html form (mysql)
app.post('/submit', urlencodedParser, (req, res) => {
    const yname = req.body.yname;
    const email = req.body.email;
    const message = req.body.message;
        const sql = "INSERT INTO contactus (name, email, message) VALUES ('" +cryptr.encrypt(yname)+ "', '" + cryptr.encrypt(email) + "',  '" + cryptr.encrypt(message) + "')";
        database.query(sql, (err, result) => {
            if (err) throw err;
            console.log('data inserted successfully!');
    });
    res.sendFile('views/contact.html', {root: __dirname});
});

app.get('/submit', (req, res) => {
    const sql = "SELECT * FROM contactus";
    database.query(sql, (err, result) => {
        if (err) throw err;
        console.log(cryptr.decrypt(yname) + cryptr.decrypt(email) + cryptr.decrypt(message));
        res.end();
        console.log(res);
    })
})


app.get('/', (req, res, next) => {
    res.render('contact', {title: 'Express'});
});

// Rendering html
app.get("/contactus", (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});

app.get("/blogs", (req, res) => {
    res.sendFile(__dirname + '/views/blogs.html');
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/view/welcome'));
})

// Rendering html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/welcome'));
});


app.listen(port, hostname, () => {
    loger('Server running on port 2000');
});