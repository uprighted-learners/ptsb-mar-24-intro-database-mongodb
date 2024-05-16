const express = require("express");
const router = express.Router();
const checkFruitName = require("../middleware/checkFruitName");
const fruitController = require("../controllers/fruitController");

// localhost:3000/fruits/
router.get("/", fruitController.getAllFruits);

// localhost:3000/fruits/:id
router.get("/:id", fruitController.getFruitById);

// localhost:3000/fruits/
router.post("/", checkFruitName, fruitController.addNewFruit);

router.put("/:id", checkFruitName, fruitController.updateFruit);

router.delete("/:id", fruitController.deleteFruit);

module.exports = router;