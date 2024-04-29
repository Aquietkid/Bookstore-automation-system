const express = require('express')
const mysql = require('mysql2')
const router = express.Router()
const connection = require("../config/persistence");

// Insert new Item 
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

// Delete an item 
// router.get('/delete/:id', async (req, res) => {

//   console.log(req.params);

//     connection.connect(function (err) {
//         if (err) throw err;
//         const itemID = req.params.id;

//         var sql = 'DELETE FROM inventory WHERE id = ?;'
//         connection.query(sql, [itemID], function (err, result) {
//             if (err) throw err;
//             else if (result.affectedRows == 0) {
//                 return res.send('No item deleted. Check if ID was correct.');
//             }
//             else {
//                 return res.json({ message: "Item deleted!" });
//             }
//         });
//     });
// })

//GPT DELETE ITEM
router.delete('/delete/:id', async (req, res) => { // Changed router method to DELETE

  console.log(req.params);
  console.log('Delete Item API called');

  // Assuming 'connection' is your MySQL connection

  const itemID = req.params.id;

  var sql = 'DELETE FROM inventory WHERE id = ?;';
  connection.query(sql, [itemID], function (err, result) {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.affectedRows == 0) {
          return res.status(404).json({ message: 'No item deleted. Check if ID was correct.' });
      } else {
          return res.status(200).json({ message: 'Item deleted!' });
      }
  });
});


// Get the quantity in stock for an item
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

// Update the quantity of an item
router.put('/:id/updateQuantity', (req, res) => {
    const itemId = parseInt(req.params.id);
    const quantityChange = parseInt(req.body.quantityChange);
  
    if (!quantityChange) {
      return res.send('Please specify the quantity change.');
    }
  
    // Determine the SQL query based on the sign of quantityChange
    const sqlUpdate = quantityChange > 0 ?
      'UPDATE inventory SET quantity = quantity + ? WHERE id = ?;' :
      'UPDATE inventory SET quantity = GREATEST(0, quantity - ABS(?)) WHERE id = ?;';
  
    connection.query(sqlUpdate, [Math.abs(quantityChange), itemId], (error, results) => {
      if (error) {
        return res.send('Error updating inventory: ' + error.message);
      }
      if (results.affectedRows === 0) {
        return res.send('Item not found or insufficient quantity for decrement.');
      }
      res.send(`Inventory updated successfully. The quantity was ${quantityChange > 0 ? 'increased' : 'decreased'}.`);

      
    });
  });
 
  // Udpate the price of an item
  router.put('/:id/updatePrice', (req, res) => {
    const itemId = parseInt(req.params.id);
    const newPrice = parseInt(req.body.newPrice);
  
    if (isNaN(newPrice) || newPrice < 0) {
      return res.send('Please provide a valid new price.');
    }
  
    const sqlUpdatePrice = 'UPDATE inventory SET price = ? WHERE id = ?;';
  
    connection.query(sqlUpdatePrice, [newPrice, itemId], (error, results) => {
      if (error) {
        return res.send('Error updating product price: ' );
      }
      if (results.affectedRows === 0) {
        return res.send('Product not found.');
      }
      res.send('Product price updated successfully.');
    });
  });



// Place order when item is low in stock. 
//   router.post('/placeOrder', (req, res) => {
//     // Define the query to find items with quantity less than 5
//     const findLowStockItems = 'SELECT id, name FROM inventory WHERE quantity < 5;';
  
//     connection.query(findLowStockItems, async (error, results) => {
//       if (error) {
//         return res.send('Error retrieving low stock items: ' );
//       }
  
      
//       if (results.length === 0) {
//         return res.send('All items have sufficient stock.');
//       }
  
//       // Assume we always order from the first supplier in the Supplier table for simplicity
//       const supplierIdQuery = 'SELECT ID FROM Supplier ORDER BY ID LIMIT 1;';
  
    
//       results.forEach(item => {
//         connection.query(supplierIdQuery, (suppError, suppResults) => {
//           if (suppError) {
//             return res.send('Error finding supplier: ' + suppError.message);
//           }
  
          
//           if (suppResults.length === 0) {
//             return res.status(500).send('No suppliers available to place order.');
//           }
  
//           // Place the order for 8 items
//           const placeOrderQuery = `
//             INSERT INTO Orders (item_id, supplier_id, quantity)
//             VALUES (?, ?, 8);
//           `;
//           const supplierId = suppResults[0].ID;
  
//           connection.query(placeOrderQuery, [item.id, supplierId], (orderError, orderResults) => {
//             if (orderError) {
//               return res.send('Error placing order for item ' + item.id + ': ' + orderError.message);
//             }
//             console.log('Order placed for item ' + item.id);
//           });
//         });
//       });
  
//       res.send('Orders placed for all low stock items.');
//     });
//   });
  


module.exports = router