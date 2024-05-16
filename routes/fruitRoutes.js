const express = require("express");
const router = express.Router();
const fruitController = require("../controllers/fruitController");

// localhost:3000/fruits/
router.get("/", fruitController.getAllFruits);

// localhost:3000/fruits/:id
router.get("/:id", fruitController.getFruitById);

// localhost:3000/fruits/
router.post("/", fruitController.addNewFruit);

router.put("/:id", fruitController.updateFruit);

router.delete("/:id", fruitController.deleteFruit);

module.exports = router;