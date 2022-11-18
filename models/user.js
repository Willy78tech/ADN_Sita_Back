const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    pseudo: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: false,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
    },
    following: {
      type: Array,
      required: false,
    },
    followers: {
      type: Array,
      required: false,
    },
    boycotting: {
      type: Array,
      required: false,
    },
    reporting: {
      type: Array,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
