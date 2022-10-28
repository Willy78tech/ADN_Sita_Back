const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    pseudo: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    quote: {
      type: String,
      required: true,
      maxlength: 255 
    },
    password: {
      type: String,
      required: true
    },
    following: {
      type: Array,
      required: false
    },
    followers: {
      type: Array,
      required: false
    },
    boycotting: {
      type: Array,
      required: false
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


