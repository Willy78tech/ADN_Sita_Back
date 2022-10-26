const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boycottSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true,
      maxLenght: 244,
    },
    description: {
      type: String,
      require: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
  },
  //{ timestamps: true }
);

module.exports = mongoose.model('Boycott', boycottSchema);