const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const port = 3000;

const fruits = [
    {
        id: 1,
        name: "banana"
    },
    {
        id: 2,
        name: "mango"
    }
]

// GET all route
app.get("/fruits", (req, res) => {
    res.json(fruits);
});

// GET by id route
app.get("/fruits/:id", (req, res) => {
    console.log(req.params);
    console.log(typeof req.params.id);

    if (isNaN(req.params.id)) {
        return res.status(406).send("Please insert a number for id")
    }

    for (let fruit of fruits) {
        if (fruit.id === parseInt(req.params.id)) {
            return res.status(200).send(fruit);
        }
    }

    res.status(404).send("Fruit not found.")
})

app.post("/fruits/add", (req, res) => {
    console.log(req.body);

    res.send("POST Route Hit")
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})