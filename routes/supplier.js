const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const connection = require("../config/persistence");




// get book price

router.get('/:id', (req, res) => {

    connection.connect(function (err) {
        if (err) throw err;
        // console.log('DB Connected!');
        var sql = 'SELECT * FROM Supplier;';
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        });
    
    });
    res.send(req.params.id)
})


// get all books and their prices

router.get('/', (req, res) => {
    res.send('Hey, I will return the price of the book')

})


module.exports = router