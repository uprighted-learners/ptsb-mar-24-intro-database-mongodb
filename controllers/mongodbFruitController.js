// import the necessary dependencies
const Fruit = require("../models/fruit");

// GET all Fruits route
exports.getAllFruits = async (req, res) => {
    // Fruit.find({})
    //     .then((fruits) => {
    //         res.status(200).json(fruits);
    //     })
    //     .catch((err) => {
    //         res.status(500).json("Couldn't grab fruits. Something went wrong");
    //     })

    try {
        // Attempt to get all fruits from the database
        const fruits = await Fruit.find({});
        // Send back status code of 200.
        res.status(200).json(fruits);
    } catch (err) {
        // If there was an error getting all fruits, send back a status code of 500 with general error message.
        res.status(500).json("Couldn't grab fruits. Something went wrong");
    }
}

// GET Fruit by Id
exports.getFruitById = async (req, res) => {
    try {
        // Attempt to get one specified fruit using findOne
        const fruit = await Fruit.findOne({_id: req.params.id});
        console.log(fruit);

        // If fruit is falsey (null), return a status code of 404 with message of Fruit not found
        if (!fruit) {
            res.status(404).json("Fruit not found");
            return;
        }

        // If this line of code is reached, then we got our fruit so send back status code of 200 with the fruit.
        res.status(200).json(fruit);
    } catch (err) {
        // If there was an error getting that one fruit, send back a status code of 500 with a general error message.
        res.status(500).json("Something went wrong");
    }
}

// POST Add Fruit
exports.addNewFruit = async (req, res) => {
    try {
        // Construct new fruit object using name from body object.
        const newFruit = {
            name: req.body.name
        }

        // Use .create to create a new Fruit.
        await Fruit.create(newFruit);
        // After successful creation, use a status code of 201, then send back message of "Fruit added".
        res.status(201).json("Added Fruit");
    } catch (err) {
        // If there was an error creating that fruit, send back status code of 500 with general error message.
        res.status(500).json("Couldn't add Fruit");
    }
}

// PUT Update Fruit
exports.updateFruit = async (req, res) => {
    try {
        // Attempt to get one specified fruit using findOne
        const fruit = await Fruit.findOne({_id: req.params.id});
        console.log(fruit);

        // If fruit is falsey (null), return a status code of 404 with message of Fruit not found
        if (!fruit) {
            res.status(404).json("Fruit not found");
            return;
        }

        // Construct updated fruit
        const updatedFruit = {
            _id: req.params.id,
            name: req.body.name
        }

        // Using findByIdAndUpdate, we give the id and our constructed fruit object.
        await Fruit.findByIdAndUpdate(req.params.id, updatedFruit);

        // Send back a status code of 200, with Fruit updated message
        res.status(200).json("Fruit updated");
    } catch (err) {
        // If there was an error in getting by id or updating, then send back status code of 500 with error message "Couldn't update fruit"
        res.status(500).json("Couldn't update fruit");
    }
}

// DELETE Remove Fruit
exports.deleteFruit = async (req, res) => {
    try {
        // Attempt to get one specified fruit using findOne
        const fruit = await Fruit.findOne({_id: req.params.id});
        console.log(fruit);

        // If fruit is falsey (null), return a status code of 404 with message of Fruit not found
        if (!fruit) {
            res.status(404).json("Fruit not found");
            return;
        }

        // Using findByIdAndDelete, pass in the id from the params object to delete the specified fruit
        await Fruit.findByIdAndDelete(req.params.id);
        // Send back status code of 200 with message "Fruit removed"
        res.status(200).json("Fruit removed");
    } catch (err) {
        // Send back status code of 500 with error message "Fruit could not be removed"
        res.status(500).json("Fruit could not be removed")
    }
}