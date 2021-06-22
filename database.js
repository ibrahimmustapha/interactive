const mysql =  require('mysql');

// Mysql connection
const con = mysql.createConnection( {
    host: 'localhost', 
    user: 'root',
    password: 'Codem.1jan',
    database: 'BlogDB'
});

con.connect( (err) => {
    if (err) throw err;
    console.log('Database connected successfully');
});

module.exports = con;