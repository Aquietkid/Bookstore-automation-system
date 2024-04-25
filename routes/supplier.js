const express = require('express')
const router = express.Router()


// get book price

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})


// get all books and their prices

router.get('/', (req, res) => {
    res.send('Hey, I will return the price of the book')
    
})


module.exports = router