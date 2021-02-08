const Task = require("../../model/Task");

const loadTasks = async (req, res, next) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";
  const limit = 3;

  try {
    const tasks = await Task.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ dueDate: sort });

    const totalDocuments = await Task.countDocuments();
    const taskId = req.query.id;

    req.headers = {
      tasks: tasks,
      taskId: taskId,
      totalDocuments: totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
      currentSort: sort,
    };

    next();
  } catch (err) {
    res.render("error.ejs", { err });
  }
};

module.exports = loadTasks;
