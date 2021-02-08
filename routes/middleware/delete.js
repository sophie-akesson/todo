const Task = require("../../model/Task");

const deleteMiddleware = async (req, res) => {
  const page = +req.query.page || 1;
  const sort = req.query.sort || "asc";

  try {
    const id = req.query.id;
    await Task.deleteOne({ _id: id });
    res.redirect(301, "/?page=" + page + "&sort=" + sort);
  } catch (err) {
    res.render("error.ejs", { err });
  }
};

module.exports = deleteMiddleware;
