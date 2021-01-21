const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes/index");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/", router);

app.listen(process.env.PORT, ()=> {
    console.log("Server running on port 3000!");
});