import { SuperMemoGrade, supermemo } from "supermemo";
import mongoose from "mongoose";
import Deck from "./Deck";
import { userService } from "../user/user.usecases";
import { NotFound, ServerError } from "../../lib/errors";
import { CardInputType, DeckInputType, GradeCardInput } from "./Schema";
import supabase, { createImageURL, uploadFile } from "../../config/supabase";
import Task from "../task/Task";
import UserModel from "../user/Users";
import log from "../../config/logger";

export async function addNewFlashcard(deckId: string, cardInfo: CardInputType) {
  await UserModel.findOneAndUpdate(
    { _id: deckId },
    { $push: { cards: cardInfo } }
  );
}

export async function create(deckInfo: DeckInputType) {
  const exists = await userService.query(deckInfo.owner);
  if (!exists) {
    log.debug("Cannot create deck. User does not exist");
    throw new NotFound("User does not exist");
  }

  const deck = new Deck({
    deckName: deckInfo.deckName,
    owner: deckInfo.owner,
    taskStatus: "pending",
    blurhash: deckInfo.blurhash,
  });
  await deck.save();

  await UserModel.findOneAndUpdate(
    { _id: deckInfo.owner },
    { $push: { decks: deck._id } }
  );

  const task = new Task({
    deckId: deck._id,
  });
  await task.save();
  const taskId = task._id;

  try {
    let imagePath = "";
    let imageURL = "";
    let blurhash = deckInfo.blurhash;

    const doThing = async () => {
      // upload deck image
      await Task.findOneAndUpdate(
        { _id: taskId },
        { $push: { tasks: "Uploading Image" } }
      );
      if ("deckImageFile" in deckInfo) {
        // convert file upload to blob
        const deckImageStoragePath = `/public/${deck._id}`;
        const imageBlob = new Blob([deckInfo?.deckImageFile?.data], {
          type: deckInfo?.deckImageFile?.mimetype,
        });

        const bucket = "deck_images";

        const { error, data } = await uploadFile(
          bucket,
          `/public/${deck._id}`,
          imageBlob
        );

        if (error) {
          throw new ServerError("Could not upload image");
        }

        const { data: signedURL, error: signedError } = await createImageURL(
          bucket,
          `/public/${deck._id}`
        );

        if (signedError) {
          // console.error("error", signedError.message)
          throw new ServerError(signedError.message);
        }

        imagePath = data.path;
        imageURL = signedURL.signedUrl;
      }

      if (deckInfo.aiAssist) {
        await Task.findOneAndUpdate(
          { _id: taskId },
          { $push: { tasks: "AI generating flash cards." } }
        );
      }

      await Task.findOneAndUpdate(
        { _id: taskId },
        { $push: { tasks: "Saving Deck." } }
      );

      await Deck.findOneAndUpdate(
        { _id: task.deckId },
        {
          deckImage: imageURL,
          deckImageName: imagePath,
          blurhash: blurhash,
          taskStatus: "complete",
        }
      );

      await Task.findOneAndUpdate(
        { _id: taskId },
        {
          $push: { tasks: "Task complete." },
          $set: { isPending: false },
        }
      );
    };
    doThing();
    return { taskId: taskId };
  } catch (err) {
    await Task.findOneAndUpdate(
      { _id: taskId },
      {
        $push: { tasks: "Task complete." },
        $set: {
          isPending: false,
          success: false,
          errorMessage: "something went wrong.",
        },
      }
    );
    await Deck.findOneAndUpdate(
      { id: task.deckId },
      {
        $set: {
          taskStatus: "failed",
        },
      }
    );
    log.error("task error", err);
  }
}

export async function getOneFlashcardDeck(deckId: string) {
  let id = new mongoose.mongo.ObjectId(deckId);
  const deckList = await Deck.findOne({ _id: id });
  return deckList;
}

export async function getAllFlashcardDecks(userId: string) {
  let id = new mongoose.mongo.ObjectId(userId);
  const deckList = await Deck.find({ owner: id });
  return deckList;
}

export async function updateDeck(deckId: string, deckInfo: DeckInputType) {
  await Deck.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(deckId) },
    { $set: deckInfo }
  );
}

export async function remove(deckId: string) {
  await supabase.storage.from("deck_images").remove([`public/${deckId}`]);
  await Deck.deleteOne({ _id: deckId });
}

export async function gradeCard({ deckId, cardId, grade }: GradeCardInput) {
  try {
    log.debug("Grading card");
    const foundDeck = await Deck.findOne(
      { _id: deckId, "cards._id": cardId },
      { cards: { $elemMatch: { _id: cardId } } }
    );
    if (!foundDeck) {
      throw new NotFound("Flashcard not found");
    }
    // extract data to update due data
    const card = foundDeck.cards[0];
    log.debug(`from ${card}`);
    const stats = {
      interval: card.interval,
      repetition: card.repetition,
      efactor: card.efactor,
      status: card.status,
    };
    // insert data to algorithm
    const { interval, repetition, efactor } = supermemo(
      stats,
      grade as SuperMemoGrade
    );
    const reviewedDate = new Date();
    let date = new Date();
    let dueDate = new Date();
    // set new due date
    dueDate.setDate(date.getDate() + interval);

    // if card type is new, set to reviewed
    if (stats.status === "new" && interval > 0) {
      // update data
      await Deck.findOneAndUpdate(
        { _id: deckId, "cards._id": cardId },
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
        { _id: deckId, "cards._id": cardId },
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
  } catch (err: any) {
    throw new Error(err);
  }
}
export const deckService = {
  addNewFlashcard: addNewFlashcard,
  createNewFlashcardDeck: create,
  getOneFlashcardDeck: getOneFlashcardDeck,
  getAllFlashcardDecks: getAllFlashcardDecks,
  updateDeck: updateDeck,
  removeDeck: remove,
  gradeCard: gradeCard,
};
