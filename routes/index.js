const express = require("express");
const router = express.Router();
const Task = require("../model/Task");

router.get("/", async (req, res) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";
  const limit = 3;

  try {
    const tasks = await Task.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({"dueDate": sort});

    const totalDocuments = await Task.countDocuments();

    res.render("index.ejs", { tasks, totalPages: Math.ceil(totalDocuments / limit), currentPage: page, currentSort: sort});
  } catch (err) {
    console.log(err);
  }
});

router.get("/edit", async (req, res) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";
  const limit = 3;

  try {
    const tasks = await Task.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({"dueDate": sort});

    const totalDocuments = await Task.countDocuments();
    const taskId = req.query.id;
    
    res.render("edit.ejs", { tasks, taskId, totalPages: Math.ceil(totalDocuments / limit), currentPage: page, currentSort: sort });
  } catch (err) {
    console.log(err);
  }
});

router.post("/new", async (req, res) => {
  const page = +req.query.page || 1;

  try {
    const newTask = new Task({
      name: req.body.nameInput,
      dueDate: req.body.dateInput,
    });
    const savedTask = await newTask.save();
    res.redirect(301, "/?page=" + page);
  } catch (err) {
    const tasks = await Task.find();
    res.render("index.ejs", { tasks, message: err });
    console.log(err);
  }
});

router.post("/edit", async (req, res) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";

  try {
    const changedTask = await Task.updateOne(
      { _id: req.query.id },
      { name: req.body.editName, dueDate: req.body.editDate }
    );
    res.redirect(301, "/?page=" + page + "&sort=" + sort);
  } catch (err) {
    console.log(err);
  }
});

router.get("/delete", async (req, res) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";

  try {
    const id = req.query.id;
    await Task.deleteOne({_id:id});
    res.redirect(301, "/?page=" + page + "&sort=" + sort);
  } catch (err) {
    console.log(err);
  }
});

// Temporary post route for form delete combined with id and pagination. To be removed once we have a link and span that resembles a checkbox.
router.post("/delete", async (req, res) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";

  try {
    const id = req.query.id;
    await Task.deleteOne({_id:id});
    res.redirect(301, "/?page=" + page + "&sort=" + sort);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
