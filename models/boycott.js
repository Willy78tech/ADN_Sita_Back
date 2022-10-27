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
    image: {
      type: String,
      require: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userParticipating: {
      type: Array,
      require: false
    }
  },
  //{ timestamps: true }
);

module.exports = mongoose.model('Boycott', boycottSchema);