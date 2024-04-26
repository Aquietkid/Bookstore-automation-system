const express = require('express')
const mysql = require('mysql')
const router = express.Router()

// get book price

router.get('/:id', (req, res) => {

    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    });


    con.connect(function (err) {
        if (err) throw err;
        console.log('DB Connected!');
        var sql = 'SELECT * FROM Test_ali.Supplier;';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        });
        
        res.send('Inside body of function');
    });
    res.send(req.params.id)

    con.end((err) => {
        if (err) return console.error(err.message);
      
        console.log('Close the database connection.');
      });


})


// get all books and their prices

router.get('/', (req, res) => {
    res.send('Hey, I will return the price of the book')
    
})


module.exports = router