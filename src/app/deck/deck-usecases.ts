import { supermemo } from "supermemo";
import mongoose from "mongoose";
import Deck from "./Deck";
import db from "../../config/db";
import { generateId } from "../../utils/utils";
import AppError from "../../lib/error/AppError";

export const deckService = ((Deck) => {
  return {
    addNewFlashcard: addNewFlashcard(Deck),
    createNewFlashcardDeck: createNewFlashcardDeck,
    getOneFlashcardDeck: getOneFlashcardDeck(Deck),
    getAllFlashcardDecks: getAllFlashcardDecks(Deck),
    updateDeck: updateDeck(Deck),
    removeDeck: removeDeck(Deck),
    gradeCard: gradeCard(Deck, supermemo),
  };
})(Deck);

export function addNewFlashcard(Deck) {
  return async (deckId, cardInfo) => {
    await Deck.findOneAndUpdate(
      { _id: deckId },
      { $push: { cards: cardInfo } }
    );
    return 1;
  };
}

export async function createNewFlashcardDeck(deckInfo) {
  const generateFlashcards = deckInfo.generateFlashcards; 
  const generateDeckImage = deckInfo.generateDeckImage; 

  let submissionStage = "";

  try {
    const deck = new Deck(deckInfo);
    await deck.save();
    const submissionId = generateId();
    await db.PendingSubmission.create({
       deckId: deckInfo.id,
       submissionId: submissionId,
       state: "stage 1"
    })
  } catch(err) {
  }

}

export function getOneFlashcardDeck(Deck) {
  return async (deckId) => {
    let id = new mongoose.mongo.ObjectId(deckId);
    const deckList = await Deck.findOne({ _id: id });
    return deckList;
  };
}

export function getAllFlashcardDecks(Deck) {
  return async (userId) => {
    let id = new mongoose.mongo.ObjectId(userId);
    const deckList = await Deck.find({ owner: id });
    return deckList;
  };
}

export function updateDeck(Deck) {
  return async (deckId, deckInfo) => {
    await Deck.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(deckId) },
      { $set: deckInfo }
    );
  };
}

export function removeDeck(Deck) {
  return async (deckId) => {
    await Deck.deleteOne({ _id: deckId });
  };
}

export function gradeCard(Deck, practice) {
  return async (userId, cardId, grade) => {
    try {
      const foundDeck = await Deck.findOne(
        { owner: userId, "cards._id": cardId },
        { cards: { $elemMatch: { _id: cardId } } }
      );
      // extract data to update due data
      const card = foundDeck.cards[0];
      const stats = {
        interval: card.interval,
        repetition: card.repetition,
        efactor: card.efactor,
        status: card.status,
      };
      // insert data to algorithm
      const { interval, repetition, efactor } = practice(stats, grade);
      const reviewedDate = new Date();
      let date = new Date();
      let dueDate = new Date();
      // set new due date
      dueDate.setDate(date.getDate() + interval);

      // if card type is new, set to reviewed
      if (stats.status === "new" && interval > 0) {
        // update data
        await Deck.findOneAndUpdate(
          { owner: userId, "cards._id": cardId },
          {
            $set: {
              "cards.$.interval": interval,
              "cards.$.repetition": repetition,
              "cards.$.efactor": efactor,
              "cards.$.status": "reviewed",
              "cards.$.reviewedDate": reviewedDate.toISOString(),
              "cards.$.dueDate": dueDate.toISOString(),
            },
            $push: { reviewList: cardId },
          }
        );
      } else {
        // update data
        await Deck.findOneAndUpdate(
          { owner: userId, "cards._id": cardId },
          {
            $set: {
              "cards.$.interval": interval,
              "cards.$.repetition": repetition,
              "cards.$.efactor": efactor,
              "cards.$.reviewedDate": reviewedDate.toISOString(),
              "cards.$.dueDate": dueDate.toISOString(),
            },
          }
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  };
}
