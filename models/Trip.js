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
  latO: Number,
  lngO: Number,
  latD: Number,
  lngD: Number,
  price: Number,
  orders: Array,
  tripNewDistance: Number,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  userObject: Object
});

mongoose.model("trips", tripSchema);
