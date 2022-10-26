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
    password: {
      type: String,
      required: true
    },
    myFollowedUsers: {
      type: Array,
      require: false
    },
    myFollowedBoycotts: {
      type: Array,
      require: false
    },
    myFollowers: {
      type: Array,
      require: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


