import { buildServer } from "./lib/buildServer";
import mongoose from "mongoose";
import log from "./config/logger";
import "dotenv/config";
import AwardsModel from "./app/awards/Awards";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

async function initializeDatabase() {
  // create awards
  let awards = [
    {
      name: "Mastery",
      type: "deck",
      description: "Mastered All cards in a deck",
      code: 1000,
    },
    {
      name: "AI Generated",
      type: "deck",
      description: "Empowered deck with AI",
      code: 1001,
    },
    {
      name: "Beginnings",
      type: "user",
      description: "Practice once",
      code: 5000,
    },
  ];
  const session = await mongoose.connection.startSession();
  session.startTransaction();
  await mongoose.connection.startSession();
  await AwardsModel.collection.drop();
  for (const award of awards) {
    await AwardsModel.create(award);
  }
  await session.commitTransaction();
  session.endSession();
}

const PORT = process.env.PORT || 3001;

const server = buildServer().listen(PORT, async () => {
  log.info(`listening on port ${PORT}`);
  await mongoose.connect(`${process.env.DATABSE_URI}`);
  await initializeDatabase();
  log.info("Connected to DB");
});
