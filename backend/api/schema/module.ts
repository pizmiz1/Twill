import mongoose from "mongoose";

const daysSchema = new mongoose.Schema({
  mon: { type: Boolean, required: true },
  tues: { type: Boolean, required: true },
  wed: { type: Boolean, required: true },
  thur: { type: Boolean, required: true },
  fri: { type: Boolean, required: true },
  sat: { type: Boolean, required: true },
  sun: { type: Boolean, required: true },
});

const moduleSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  days: { type: daysSchema, required: true },
});

const Module = mongoose.model("Module", moduleSchema);

export default Module;
