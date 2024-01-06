import mongoose from "mongoose";

const AwardsSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String },
  description: { type: mongoose.Schema.Types.String, default: "" },
  code: { type: mongoose.Schema.Types.Number },
});

const AwardsModel = mongoose.model("awards", AwardsSchema);

export default AwardsModel;
