const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const connection = require("../config/persistence");

// var connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_DATABASE,
// });



connection.connect(function (err) {
    if (err) throw err;
    console.log('DB Connected!');
    var sql = 'SELECT * FROM Test_ali.Supplier;';
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });

    // res.send('Inside body of function');
});


// get book price

router.get('/:id', (req, res) => {
    
    res.send(req.params.id)
    


})


// get all books and their prices

router.get('/', (req, res) => {
    res.send('Hey, I will return the price of the book')

})


module.exports = router