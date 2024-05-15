const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const port = 3000;

const fruits = [
    {
        id: uuidv4(),
        name: "banana"
    },
    {
        id: uuidv4(),
        name: "mango"
    }
]

// GET all route
app.get("/fruits", (req, res) => {
    console.log(fruits);
    res.json(fruits);
});

// GET by id route
app.get("/fruits/:id", (req, res) => {
    console.log(req.params);
    console.log(typeof req.params.id);

    for (let fruit of fruits) {
        if (fruit.id === req.params.id) {
            return res.status(200).send(fruit);
        }
    }

    res.status(404).send("Fruit not found.")
})

app.post("/fruits", (req, res) => {
    console.log(req.body);

    if (fruits.length > 0 && fruits.some((fruit) => fruit.name === req.body.name)) {
        res.send("Fruit already exists");
        return;
    }

    const newFruit = {
        id: uuidv4(),
        name: req.body.name
    };

    fruits.push(newFruit);
    
    res.send(newFruit);
});

app.put("/fruits/:id", (req, res) => {
    for (let fruit of fruits) {
        if (fruit.id === req.params.id) {
            fruit.name = req.body.name;
            res.status(200).send("Update Successful");
            return;
        }
    }

    res.status(404).send("Fruit not found");
});

app.delete("/fruits/:id", (req, res) => {
    for (let i = 0; i < fruits.length; i++) {
        if (fruits[i].id === req.params.id) {
            fruits.splice(i, 1);
            res.status(200).send("Fruit deleted");
            return;
        }
    }

    res.status(404).send("Fruit not found");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})