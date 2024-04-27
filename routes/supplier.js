const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const connection = require("../config/persistence");




// get item price

/*
    RESULT I WANT:
    ItemName    SupplierName    Price
    
    PARAMS I GIVE: 
    ItemID

    QUERY:
    SELECT Item.Name , Supplier.Name, SupplierItem.Price
    FROM SupplierItem 
    JOIN Supplier ON Supplier.ID = SupplierItem.SupplierID
    JOIN Item ON Item.ID = SupplierItem.ItemID
    WHERE ItemID = 2;
    
*/

router.get('/:id', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const ItemID = req.params.id;
        // console.log('DB Connected!');
        var sql = 'SELECT Item.Name , Supplier.Name, SupplierItem.Price ' +
        'FROM SupplierItem '+
        'JOIN Supplier ON Supplier.ID = SupplierItem.SupplierID '+
        'JOIN Item ON Item.ID = SupplierItem.ItemID '+
        'WHERE ItemID = ?;';
        connection.query(sql, [ItemID], function (err, result) {
            if (err) throw err;
            if(result.length == 0) {
                res.send('No Supplier ships that item');
            }
            if(result.length == 1) {
                // If you only expect one result, you might want to send it directly
                return res.json({data: result[0]});
            } else {
                // If you expect multiple results, you can send the array of results
                var min = ({
                    Name: result[0].Name, 
                    Price: result[0].Price
                })
                result.forEach(element => {
                    if(element.Price < min.Price){
                        min.Name = element.Name;
                        min.Price = element.Price;
                    }
                });
                return res.json({data: min});
            }
        });
    });
})


// get all books and their prices

router.get('/', (req, res) => {
    res.send('Hey, I will return the price of the book')

})


module.exports = router