import express from "express";
import validateToken from "../../middleware/validateToken";
import Task from "../task/Task";
import { deckService } from "./deck.usecases";
import HttpStatus from "../../lib/httpStatus";

const router = express.Router();

import {
  DeckInputSchema,
  GetTaskInputSchema,
  GradeCardInputSchema,
} from "./Schema";
import validateRequest from "../../middleware/validateRequest";

router.get("/:deckId/task", async (req, res) => {
  const {
    params: { deckId },
  } = await validateRequest(GetTaskInputSchema, req);
  const taskData = await Task.findOne({
    deckId: deckId,
  });

  res.status(200).send(taskData);
});

router.post("/", validateToken, async (req, res) => {
  let tempBody: any = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof key === "string") {
      tempBody[key] = JSON.parse(value as any);
    }
  }
  Object.assign(req.body, tempBody);
  const { body } = await validateRequest(DeckInputSchema, req);
  const { id } = req.user;

  const response = await deckService.createNewFlashcardDeck({
    ...body,
    owner: id,
    deckImageFile: req.files?.deckImage as any,
  });

  res.status(HttpStatus.CREATED).send(response);
});

router.get("/:id", async (req, res) => {
  const deckList = await deckService.getAllFlashcardDecks(req.params.id);
});

router.get("/get/:id", async (req, res) => {
  const deckList = await deckService.getOneFlashcardDeck(req.params.id);
  // return createResponse(httpStatus.SUCCESS, {deckList})
});

router.delete("/delete/:id", validateToken, async (req, res) => {
  const { id } = req.params;
  console.log("deleting deck", id);
  await deckService.removeDeck(id);
  res.sendStatus(200);
});

router.post("/:deckId/card/:cardId/grade", async (req, res) => {
  const { deckId, cardId } = req.params;
  const {
    body: { grade },
  } = await validateRequest(GradeCardInputSchema, req);
  await deckService.gradeCard({ deckId, cardId, grade });
  res.sendStatus(HttpStatus.OK);
});

router.post("/update/:id", async (req, res) => {
  await deckService.updateDeck(req.params.id, req.body.details);
  // return createResponse(httpStatus.SUCCESS, {message:'updated'})
});

router.post("/cards", async (req, res) => {
  await deckService.addNewFlashcard(req?.body?.deckId, req?.body?.cards);
  // return createResponse(httpStatus.SUCCESS, {message: 'card added'})
});

export default router;
