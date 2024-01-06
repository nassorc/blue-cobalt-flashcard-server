import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserAwardInputSchema, deckAwardInputSchema } from "./Schema";
import { awardsService } from "./awards.usecase";

let router = Router();

router.post("/award/user", async (req, res) => {
  const {
    params: { awardId, userId },
  } = await validateRequest(UserAwardInputSchema, req);
  await awardsService.awardUser({ awardId, userId });
});

router.post("/award/deck", async (req, res) => {
  const {
    params: { awardId, deckId },
  } = await validateRequest(deckAwardInputSchema, req);
  await awardsService.awardDeck({ awardId, deckId });
});

export default router;
