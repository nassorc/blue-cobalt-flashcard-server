import mongoose, { Types } from "mongoose";

const cardSchema = new mongoose.Schema({
    front: { type: String },
    back: { type: String },
    status: { type: String, default: "new" },
    interval: { type: Number, default: 0 },
    repetition: { type: Number, default: 0 },
    efactor: { type: Number, default: 2.5 },
    createdAt: { type: Date, default: new Date().toISOString() },
    reviewedDate: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    deckImage: { type: String },
    deckImageName: { type: String },
    blurhash: { type: String },
});

const deckSettingsSchema = new mongoose.Schema({
    reviewCards: { type: Number, default: 10 },
    newCards: { type: Number, default: 5 },
    visibility: { type: String, default: "private" },
});

const DeckSchema = new mongoose.Schema({
    deckName: { type: String, require: true },
    owner: { type: Types.ObjectId, required: true },
    cards: { type: [cardSchema] },
    reviewList: { type: [Types.ObjectId], default: [] },
    deckImage: { type: String },
    deckImageName: { type: String },
    blurhash: { type: String },
    createdAt: { type: Date, default: new Date().toISOString() },
    tags: { type: [String] },
    deckSettings: { type: deckSettingsSchema },
});

const Deck = mongoose.model("decks", DeckSchema);

export default Deck