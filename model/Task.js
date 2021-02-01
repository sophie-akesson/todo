const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("task", TaskSchema);
