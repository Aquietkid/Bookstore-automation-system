const express = require('express');
// const bodyParser = require("body-parser");
const app = express();
app.use(express.json());


const suppliersRouter = require ('./routes/supplier')
app.use('./supplier', suppliersRouter)


const sayHi = (req, res) => {
    res.send("Hi!");
};

app.get("/", sayHi);

app.listen(5000, () => {
    console.log(`Server is running on port 5000.`);
});