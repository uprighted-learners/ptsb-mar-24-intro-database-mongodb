const fs = require("fs");

// GET all Fruits route
exports.getAllFruits = (req, res) => {
    // READ info from specified file
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    const responseData = JSON.parse(data);

    // Send back response with read information
    res.json(responseData);
}

// GET Fruit by Id
exports.getFruitById = (req, res) => {
    // READ info from specified file
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    // JSON.parse the info to get back a JSON object.
    const fruits = JSON.parse(data);

    // Loop through the JSON parsed object of fruits
    for (let fruit of fruits) {
        // Check for matching ids
        if (fruit.id === parseInt(req.params.id)) {
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
    // READ info from specified file
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    // JSON.parse the info to get back a JSON object.
    const responseData = JSON.parse(data);

    // Calculate new id for new fruit entry
    const newID = responseData[responseData.length - 1].id + 1;

    // Create new fruit object
    const newFruit = {
        id: newID,
        name: req.body.name
    };

    // Add fruit to fruits array
    responseData.push(newFruit);

    // Convert fruits array to JSON string
    const textContent = JSON.stringify(responseData);

    // Overwrite contents of file with newly updated fruits array
    fs.writeFile("api/fruits.json", textContent, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Written to File");
    })
    
    res.send(newFruit);
}

exports.updateFruit = (req, res) => {
    // READ info from specified file
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    // JSON.parse the info to get back a JSON object.
    const fruits = JSON.parse(data);

    // Loop through fruits
    for (let fruit of fruits) {
        // Check for matching ids
        if (fruit.id === parseInt(req.params.id)) {
            fruit.name = req.body.name; // Change name of fruit

            // Convert fruits array to JSON string
            const textContent = JSON.stringify(fruits);

            // Overwrite contents of file with newly updated fruits array
            fs.writeFile("api/fruits.json", textContent, function (err) {
                if (err) {
                    console.log(err);
                }

                console.log("Updated Fruits.json");
            });

            res.status(200).send("Update Successful");
            return;
        }
    }

    // If we reach here then the response above was not met meaning we did not find a matching fruit.
    // Send back a status code of 404 with a message of "Fruit not found"
    res.status(404).send("Fruit not found");
}

// DELETE Remove Fruit
exports.deleteFruit = (req, res) => {
    // READ info from specified file
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    const fruits = JSON.parse(data);

    // Loop through fruits
    for (let i = 0; i < fruits.length; i++) {
        // Check for if there is a matching id from the params
        if (fruits[i].id === parseInt(req.params.id)) {
            // Remove the fruit from the fruits array
            fruits.splice(i, 1);

            // Convert fruits array to JSON string
            const textContent = JSON.stringify(fruits);

            // Overwrite contents of file with newly updated fruits array
            fs.writeFile("api/fruits.json", textContent, function (err) {
                if (err) {
                    console.log(err);
                }

                console.log("Updated Fruits.json");
            });

            res.status(200).send("Fruit deleted");
            return;
        }
    }

    // If we reach here then the response above was not met meaning we did not find a matching fruit.
    // Send back a status code of 404 with a message of "Fruit not found"
    res.status(404).send("Fruit not found");
}