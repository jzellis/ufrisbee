import mongoose from "mongoose";
import pointSchema from "./point";
import polygonSchema from "./polygon";
const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    location: { type: pointSchema, required: true, index: "2dsphere" },
    area: { type: polygonSchema, required: false, index: "2dsphere" },
  },
  { timestamps: true }
);

const Player = mongoose.model.Player || mongoose.model("Player", PlayerSchema);
export { PlayerSchema, Player };
