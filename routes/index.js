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

router.get("/:id", async (req, res) => {
  try {
    const tasks = await Task.find();
    const taskId = req.params.id;
    res.render("edit.ejs", { tasks, taskId });
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
    const tasks = await Task.find();
    res.render("index.ejs", { tasks, message: err });
    console.log(err);
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const changedTask = await Task.updateOne(
      { _id: req.params.id },
      { name: req.body.editName, dueDate: req.body.editDate }
    );
    res.redirect(301, "/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    await Task.deleteOne({_id:req.params.id});
    res.redirect(301, "/");
  } catch (err) {
    res.render("index.ejs", { tasks, message: err });
    console.log(err);
  }
});

module.exports = router;
