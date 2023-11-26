import mongoose from "mongoose";
import { Game, Player } from "../schema";

const Db = async () => {
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let isConnected = db.connections[0].readyState === 1;
  console.log(isConnected);

  return <></>;
};
