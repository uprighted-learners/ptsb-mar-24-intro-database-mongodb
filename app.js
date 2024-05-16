const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fruitRoutes = require("./routes/fruitRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const port = 3000;

app.use("/fruits", fruitRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})