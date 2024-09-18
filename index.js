const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/product", require("./routes/products"));

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});
