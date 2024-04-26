const express = require('express')
const mysql = require('mysql')
const router = express.Router()

var con = mysql.createConnection({
    host: "mysql-bpe-project-aliimran20004-88bc.d.aivencloud.com",
    port: "20419",
    user: "avnadmin",
    password: "AVNS_7dw5-zuiWf5KtkR9U0S",
    database: "Test_ali"
});




// get book price

router.get('/:id', (req, res) => {

    var con = mysql.createConnection({
        host: "mysql-bpe-project-aliimran20004-88bc.d.aivencloud.com",
        user: "avnadmin",
        password: "AVNS_7dw5-zuiWf5KtkR9U0S",
        database: "Test_ali"
    });


    con.connect(function (err) {
        if (err) throw err;
        console.log("DB Connected!");
        var sql = 'SELECT * FROM Test_ali.Supplier;';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        });
        
    res.send();
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