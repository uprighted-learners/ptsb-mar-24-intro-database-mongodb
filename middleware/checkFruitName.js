function checkFruitName (req, res, next) {
    // If we found a number in our name
    if (/\d/.test(req.body.name)) {
        res.status(403).send("Fruit cannot have a number in it");
    } else {
        next()
    }
}

module.exports = checkFruitName;