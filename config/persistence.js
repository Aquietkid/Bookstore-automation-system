const express = require('express')
const db = require('mysql')

var con = mysql.createConnection({
    host: "mysql-bpe-project-aliimran20004-88bc.d.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_7dw5-zuiWf5KtkR9U0S"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
    var sql = 'SELECT ID FROM Suppliers WHERE Name = \'SampleSupplier\'';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });

});
