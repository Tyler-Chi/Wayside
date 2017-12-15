const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _driverId: { type: Schema.Types.ObjectId, ref: "User" },
  _ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  accepted: Boolean,
  deliveredBy: Date,
  startLoc: String,
  endLoc: String,
  deliveredStatus: Boolean,
  rating: Number,
  price: Number,
  comments: Array,
  requestPending: Boolean,
  _tripId: { type: Schema.Types.ObjectId, ref: "Trip" },
  tripObject: Object
});

mongoose.model("orders", orderSchema);
