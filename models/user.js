const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      require: true
    },
    boycottCreated: {
      type: Array,
      require: false
    },
    boycotting: {
      type: Array,
      require: false
    },
    follower: {
      type: Array,
      require: false
    },
    followed: {
      type: Array,
      require: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);