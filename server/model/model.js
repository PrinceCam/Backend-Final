const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    default: Date.now
  }
});

const Auth = mongoose.model('Auth', AuthSchema);

const TodoSchema = new Schema({
  todo: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    default: Date.now
  }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = { Auth, Todo };