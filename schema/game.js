import mongoose from "mongoose";
import pointSchema from "./point";

const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;
const gameSchema = new mongoose.Schema(
  {
    location: { type: pointSchema, required: true, index: "2dsphere" },
    datetime: { type: Date, required: true },
    minPlayers: { type: Number, default: 0 },
    players: { type: [Object], ref: "Player", default: [] },
    description: { type: String, default: "" },
    active: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);
export default Game;
