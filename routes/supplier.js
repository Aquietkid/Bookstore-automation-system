const express = require('express')
const router = express.Router()

module.exports = router
// get book price

router.get('/', (req, res) => {
    res.send('Hey, I will return the price of the book')
})