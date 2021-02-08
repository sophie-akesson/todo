const express = require("express");
const router = express.Router();
const Task = require("../model/Task");
const deleteMiddleware = require("./middleware/delete");
const loadTasks = require("./middleware/loadTasks");

router.get("/", loadTasks, (req, res) => {
    res.render("index.ejs", {
      tasks: req.headers.tasks,
      totalPages: req.headers.totalPages,
      currentPage: req.headers.currentPage,
      currentSort: req.headers.currentSort,
      totalDocuments: req.headers.totalDocuments,
    });
});

router.get("/edit", loadTasks, (req, res) => {
    res.render("edit.ejs", {
      tasks: req.headers.tasks,
      taskId: req.headers.taskId,
      totalPages: req.headers.totalPages,
      currentPage: req.headers.currentPage,
      currentSort: req.headers.currentSort,
      totalDocuments: req.headers.totalDocuments,
    });
});

router.post("/edit", async (req, res) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";

  try {
    if (req.body.editName === "") {
      throw "Please pick a name for your task.";
    }
    const changedTask = await Task.updateOne(
      { _id: req.query.id },
      { name: req.body.editName, dueDate: req.body.editDate }
    );
    res.redirect(301, "/?page=" + page + "&sort=" + sort);
  } catch (err) {
    res.render("error.ejs", { err });
  }
});

router.post("/new", async (req, res) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";
  const limit = 3;

  try {
    if (req.body.nameInput === "New task") {
      throw "Please pick a name for your task.";
    }
    const newTask = new Task({
      name: req.body.nameInput,
      dueDate: req.body.dateInput,
    });
    const savedTask = await newTask.save();
    res.redirect(301, "/?page=" + page + "&sort=" + sort);
  } catch (err) {
      res.render("error.ejs", { err });
  }
});

router.get("/delete", deleteMiddleware);
router.post("/delete", deleteMiddleware);

router.get("*", (req, res) => {
  res.render("error.ejs", {
    err: "Sorry the page you're looking for does not exist.",
  });
});

module.exports = router;
