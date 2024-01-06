import * as z from "zod";

export const UserAwardInputSchema = z.object({
  params: z.object({
    userId: z.string(),
    awardId: z.string(),
  }),
});

export const deckAwardInputSchema = z.object({
  params: z.object({
    deckId: z.string(),
    awardId: z.string(),
  }),
});
