// import the necessary dependencies
const fruits = require("../data/fruits");
const { v4: uuidv4 } = require("uuid");

// GET all Fruits route
exports.getAllFruits = (req, res) => {
    res.json(fruits);
}

// GET Fruit by Id
exports.getFruitById = (req, res) => {
    // Loop through fruits
    for (let fruit of fruits) {
        // Find a matching fruit by its id. We are matching against the id within our req.params
        if (fruit.id === req.params.id) {
            // Send back response with status code of 200 and the found fruit object
            return res.status(200).send(fruit);
        }
    }
    // If we reach here then the response above was not met meaning we did not find a matching fruit.
    // Send back a status code of 404 with a message of "Fruit not found"
    res.status(404).send("Fruit not found.")
}

// POST Add Fruit
exports.addNewFruit = (req, res) => {
    // This can be its own middleware function.
    // Check if the name we're giving for fruit already exists
    if (fruits.length > 0 && fruits.some((fruit) => fruit.name === req.body.name)) {
        // If we give a fruit name that already exists, send back a message of 'Fruit already exists'
        res.send("Fruit already exists");
        return;
    }

    // Create a new fruit using our module for the id and name from req.body
    const newFruit = {
        id: uuidv4(),
        name: req.body.name
    };

    // Add newly constructed fruit object to fruits array.
    fruits.push(newFruit);
    
    // Send back the newly created fruit as the response of this route.
    res.send(newFruit);
}

// PUT Update Fruit
exports.updateFruit = (req, res) => {
    // Loop through our array of fruits
    for (let fruit of fruits) {
        // Check for if there is a matching id from the params
        if (fruit.id === req.params.id) {
            fruit.name = req.body.name; // Change name of fruit with name with give from the body
            res.status(200).send("Update Successful"); // Send back response code of 200 with message 'Update Successful'
            return;
        }
    }

    // If we reach here then the response above was not met meaning we did not find a matching fruit.
    // Send back a status code of 404 with a message of "Fruit not found"
    res.status(404).send("Fruit not found");
}

// DELETE Remove Fruit
exports.deleteFruit = (req, res) => {
    // Loop through our array of fruits. Base for loop
    for (let i = 0; i < fruits.length; i++) {
        // Check for if there is a matching id from the params
        if (fruits[i].id === req.params.id) {
            // Remove the fruit from the fruits array
            fruits.splice(i, 1);
            // Send back response code of 200 with message 'Fruit deleted'
            res.status(200).send("Fruit deleted");
            return;
        }
    }

    // If we reach here then the response above was not met meaning we did not find a matching fruit.
    // Send back a status code of 404 with a message of "Fruit not found"
    res.status(404).send("Fruit not found");
}