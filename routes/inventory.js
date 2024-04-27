const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const connection = require("../config/persistence");

router.post('/add/item/:itemName/:price/:qty', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const itemName = req.params.itemName;
        const price = req.params.price;
        const qty = req.params.qty;
        var sql = 'INSERT INTO inventory (name, price, quantity) VALUES (?, ?, ?);'
        connection.query(sql, [itemName, price, qty], function (err, result) {
            if (err) throw err;
            else {
                return res.json({ message: "Item Added!" });
            }
        });
    });
})

router.delete('/delete/item/:id', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const itemID = req.params.id;

        var sql = 'DELETE FROM inventory WHERE id = ?;'
        connection.query(sql, [itemID], function (err, result) {
            if (err) throw err;
            else if (result.affectedRows == 0) {
                return res.send('No item deleted. Check if ID was correct.');
            }
            else {
                return res.json({ message: "Item deleted!" });
            }
        });
    });
})


router.get('/checkStock/:id', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const id = req.params.id;
        var sql = 'SELECT quantity FROM inventory WHERE id = ?;'
        connection.query(sql, [id], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                return res.status(404).send('No product exists against given ID!');
            }
            else {
                console.log('Returning the only row returned by DB');
                return res.json({ data: result[0] });
            }
        });
    });
})

module.exports = router