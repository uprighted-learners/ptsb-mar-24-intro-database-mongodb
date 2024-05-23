const express = require("express");
const cors = require("cors");
// Import mongoose module.
const mongoose = require("mongoose");

const fruitRoutes = require("./routes/fruitRoutes");
const fileFruitRoutes = require("./routes/fileFruitRoutes");
const mongoDBFruitRoutes = require("./routes/mongodbFruitRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Connect to specified database.
mongoose.connect("mongodb://localhost:27017/fruits")
//     .then(() => {console.log("Connected to Database")}) // THEN = Successful Connection
//     .catch((err) => {console.log("Unable to connect to Database")}) // CATCH = Unsuccessful Connection

const db = mongoose.connection;
// Event listener for when we do connect to the database.
db.once('open', () => {
    // Upon connecting, log "Connected to DB"
    console.log("Connected to DB")
});

const { PORT } = process.env;

app.use("/fruits", fruitRoutes);

// THIS WILL HELP YOU ON YOUR PROJECT
app.use("/fileFruits", fileFruitRoutes);

// Our parent route for mongodb fruit routes.
app.use("/mongodbFruits", mongoDBFruitRoutes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})