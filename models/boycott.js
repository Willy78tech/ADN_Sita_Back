"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boycottSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
      maxlength: 255 
    },
    followers: {
      type: Array,
      required: false
    },
    comments: {
      type: Array,
      required: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    imageUrl: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Boycott", boycottSchema);
