const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin: '*'
}));


const port = 20419;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});


const suppliersRouter = require('./routes/supplier')
app.use('/supplier', suppliersRouter)

const inventoryRouter = require('./routes/inventory')
app.use('/inventory', inventoryRouter)


module.exports = router;