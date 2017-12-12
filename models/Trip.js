const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//to make mongoose understand we are making a relationship...

const tripSchema = new Schema({
  startLoc: Object,
  endLoc: Object,
  startDate: Date,
  endDate: Date,
  completed: Boolean,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("trips", tripSchema);
