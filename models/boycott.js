"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boycottSchema = new Schema(
  {
    target: {
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
