const express = require("express");
const mongoose = require("mongoose");
const nodeSass = require("node-sass-middleware");
require("dotenv").config();

const router = require("./routes/index");

const app = express();

app.use(
  nodeSass({
    src: __dirname + "/scss",
    dest: __dirname + "/public/style",
    prefix: "/style",
  }),
  express.static(__dirname + "/public")
);
app.use(express.urlencoded({ extended: true }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/", router);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return;
    console.log("Connected to DB!");

    app.listen(process.env.PORT, () => {
      console.log("Server up on port 3000");
    });
  }
);
