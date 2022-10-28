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
      require: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Boycott", boycottSchema);
