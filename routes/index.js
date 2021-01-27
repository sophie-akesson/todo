const express = require("express");
const router = express.Router();
const Task = require("../model/Task");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("index.ejs", { tasks });
  } catch (err) {
    console.log(err);
  }
});

router.post("/new", async (req, res) => {
  try {
    const newTask = new Task({
      name: req.body.nameInput,
      dueDate: req.body.dateInput,
    });
    const savedTask = await newTask.save();
    res.redirect(301, "/");
  } catch (err) {
    const tasks = await Product.find();
    res.render("index.ejs", { tasks, message: err });
    console.log(err);
  }
});

module.exports = router;
