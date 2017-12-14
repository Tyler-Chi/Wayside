const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _driver: { type: Schema.Types.ObjectId, ref: "User" },
  _owner: { type: Schema.Types.ObjectId, ref: "User" },
  accepted: Boolean,
  deliveredBy: Date,
  startLoc: String,
  endLoc: String,
  deliveredStatus: Boolean
});
