const mongoose = require("mongoose");

// This is our fruit schema. This is the template for our fruit records.
// We make a model based on this
const FruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model("Fruit", FruitSchema);