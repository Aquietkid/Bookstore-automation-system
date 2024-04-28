const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const connection = require("../config/persistence");



router.get('', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const ItemID = req.params.id;
        var sql = 'SELECT ';
        connection.query(sql, [ItemID], function (err, result) {
            if (err) throw err;
            else if(result.length == 0) {
                return res.send('No Supplier ships that item');
            }
            else if(result.length == 1) {
                console.log('Returning the only row returned by DB');
                return res.json({data: result[0]});
            } else {
                var min = ({
                    ItemName: result[0].ItemName, 
                    SupplierID: result[0].SupplierID,
                    SupplierName: result[0].SupplierName,
                    SupplierRate: result[0].SupplierRate
                })
                result.forEach(element => {
                    if(element.SupplierRate < min.SupplierRate){
                        min.ItemName = element.ItemName;
                        min.SupplierID = element.SupplierID;
                        min.SupplierName = element.SupplierName;
                        min.SupplierRate = element.SupplierRate;
                    }
                });
                return res.json({data: min});
            }
        });
    });
})

module.exports = router