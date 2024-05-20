// Middleware function - checkFruitName
function checkFruitName (req, res, next) {
    // Check to see if there is a number in our fruit name
    // \d is a regex expression
    if (/\d/.test(req.body.name)) {
        // If there was a number in our fruit name, then send back a status code of 403 with message 'Fruit cannot have a number in it'
        res.status(403).send("Fruit cannot have a number in it");
    } else {
        // Continue on with the rest of the route by proceeding to the controller
        next()
    }
}

module.exports = checkFruitName;