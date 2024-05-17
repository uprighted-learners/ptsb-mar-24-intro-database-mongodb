const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fruitRoutes = require("./routes/fruitRoutes");
const fileFruitRoutes = require("./routes/fileFruitRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const { PORT } = process.env;

app.use("/fruits", fruitRoutes);

// THIS WILL HELP YOU ON YOUR PROJECT
app.use("/fileFruits", fileFruitRoutes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})