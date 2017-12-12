const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//to make mongoose understand we are making a relationship...

const tripSchema = new Schema({
  startLoc: String,
  endLoc: String,
  startDate: String,
  endDate: String,
  completed: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("trips", tripSchema);
