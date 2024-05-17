const express = require("express");
const router = express.Router();
const fileFruitController = require("../controllers/fileFruitController");

// GET All
router.get("/", fileFruitController.getAllFruits);

// GET By Id
router.get("/:id", fileFruitController.getFruitById);

// POST - Add Fruit
router.post("/", fileFruitController.addNewFruit);

// PUT - Update Fruit
router.put("/:id", fileFruitController.updateFruit);

// DELETE - Delete Fruit
router.delete("/:id", fileFruitController.deleteFruit);

module.exports = router;