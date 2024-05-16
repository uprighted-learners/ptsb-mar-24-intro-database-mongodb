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

module.exports = fruits