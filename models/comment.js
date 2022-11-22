"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        boycottId: {
            type: Schema.Types.ObjectId,
            ref: "Boycott",
            required: false
        },

    },
    { timestamps: true}
);
module.exports = mongoose.model("Comment", commentSchema);