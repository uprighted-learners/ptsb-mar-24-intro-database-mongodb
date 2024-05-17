const fs = require("fs");

exports.getAllFruits = (req, res) => {
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    const responseData = JSON.parse(data);

    res.json(responseData);
}

exports.getFruitById = (req, res) => {
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    const fruits = JSON.parse(data);

    for (let fruit of fruits) {
        if (fruit.id === parseInt(req.params.id)) {
            return res.status(200).send(fruit);
        }
    }

    res.status(404).send("Fruit not found.")
}

exports.addNewFruit = (req, res) => {
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    const responseData = JSON.parse(data);

    const newID = responseData[responseData.length - 1].id + 1;

    const newFruit = {
        id: newID,
        name: req.body.name
    };

    responseData.push(newFruit);

    const textContent = JSON.stringify(responseData);

    fs.writeFile("api/fruits.json", textContent, function (err) {
        if (err) {
            console.log(err);
        }

        console.log("Written to File");
    })
    
    res.send(newFruit);
}

exports.updateFruit = (req, res) => {
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    const fruits = JSON.parse(data);

    for (let fruit of fruits) {
        if (fruit.id === parseInt(req.params.id)) {
            fruit.name = req.body.name;

            const textContent = JSON.stringify(fruits);

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

    res.status(404).send("Fruit not found");
}

exports.deleteFruit = (req, res) => {
    const data = fs.readFileSync("api/fruits.json", { encoding: "utf8", flag: "r"})
    const fruits = JSON.parse(data);

    for (let i = 0; i < fruits.length; i++) {
        if (fruits[i].id === parseInt(req.params.id)) {
            fruits.splice(i, 1);

            const textContent = JSON.stringify(fruits);

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

    res.status(404).send("Fruit not found");
}