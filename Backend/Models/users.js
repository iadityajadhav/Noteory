const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const UserModel = model("users", UserSchema, 'users')

module.exports = UserModel