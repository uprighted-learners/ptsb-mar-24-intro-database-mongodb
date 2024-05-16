const { v4: uuidv4 } = require("uuid");

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

exports.getAllFruits = (req, res) => {
    console.log(fruits);
    res.json(fruits);
}

exports.getFruitById = (req, res) => {
    console.log(req.params);
    console.log(typeof req.params.id);

    for (let fruit of fruits) {
        if (fruit.id === req.params.id) {
            return res.status(200).send(fruit);
        }
    }

    res.status(404).send("Fruit not found.")
}

exports.addNewFruit = (req, res) => {
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
}

exports.updateFruit = (req, res) => {
    for (let fruit of fruits) {
        if (fruit.id === req.params.id) {
            fruit.name = req.body.name;
            res.status(200).send("Update Successful");
            return;
        }
    }

    res.status(404).send("Fruit not found");
}

exports.deleteFruit = (req, res) => {
    for (let i = 0; i < fruits.length; i++) {
        if (fruits[i].id === req.params.id) {
            fruits.splice(i, 1);
            res.status(200).send("Fruit deleted");
            return;
        }
    }

    res.status(404).send("Fruit not found");
}