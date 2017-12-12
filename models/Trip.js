const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//to make mongoose understand we are making a relationship...

const tripSchema = new Schema({
  start_location: Object,
  end_location: Object,
  start_date: Date,
  end_date: Date,
  completed: Boolean,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("trips", tripSchema);
