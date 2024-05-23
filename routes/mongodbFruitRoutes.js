const express = require("express");
const router = express.Router();
const mongodbFruitController = require("../controllers/mongodbFruitController");

// http://localhost:3000/mongodbFruits
router.get("/", mongodbFruitController.getAllFruits);

// http://localhost:3000/mongodbFruits/:id
router.get("/:id", mongodbFruitController.getFruitById);

// http://localhost:3000/mongodbFruits
router.post("/", mongodbFruitController.addNewFruit);

// http://localhost:3000/mongodbFruits/:id
router.put("/:id", mongodbFruitController.updateFruit);

// http://localhost:3000/mongodbFruits/:id
router.delete("/:id", mongodbFruitController.deleteFruit);

module.exports = router;