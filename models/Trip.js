const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//to make mongoose understand we are making a relationship...

const tripSchema = new Schema({
  origin: String,
  destination: String,
  tripStartDate: Date,
  tripEndDate: Date,
  completed: Boolean,
  tripDistance: Number,
  lat: Number,
  lng: Number,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("trips", tripSchema);
