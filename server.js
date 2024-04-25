const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const sayHi = (req, res) => {
    res.send("Hi!");
};

app.get("/", sayHi);

app.listen(5000, () => {
    console.log(`Server is running on port 5000.`);
});
