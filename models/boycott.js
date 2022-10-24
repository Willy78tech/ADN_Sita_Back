"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boycottSchema = new Schema({
  target: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  summarize: {
    type: String,
    required: true
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: false
  // }
});

module.exports = mongoose.model('Boycott', boycottSchema);