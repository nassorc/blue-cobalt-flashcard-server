import mongoose, { SchemaTypes } from "mongoose";
import UserModel from "../../app/user/Users";
import DeckModel from "../../app/deck/Deck";
import "dotenv";

interface IDB {
  connect: () => Promise<void>;
  User: typeof UserModel;
  Deck: typeof DeckModel;
  PendingSubmission: typeof PendingSumbissionModel;
}

const pendingSubmissionSchema = new mongoose.Schema(
  {
    stage: { type: [SchemaTypes.String] },
    deckId: { type: SchemaTypes.String },
    success: { type: SchemaTypes.Boolean },
  },
  {
    timestamps: true,
  }
);

const PendingSumbissionModel = mongoose.model(
  "pendingSubmission",
  pendingSubmissionSchema
);

let db: IDB = {
  User: UserModel,
  Deck: DeckModel,
  PendingSubmission: PendingSumbissionModel,
  async connect() {},
};

db.connect = async function () {
  try {
    await mongoose.connect(String(process.env.DATABASE_URI || ""));
  } catch (err) {
    console.error(err);
  }
};

export default db;
