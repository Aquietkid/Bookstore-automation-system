// const express = require('express')
// // const bodyParser = require("body-parser");
// const app = express()
// app.use(express.json())



// app.listen(20419, () => {
//     console.log('Server is running on port 3000.');
// });


// const connection = require("./database");
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());


const suppliersRouter = require('./routes/supplier')

// Import and use routes
app.use('/',router);
app.use('/supplier', suppliersRouter)

const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = router;
