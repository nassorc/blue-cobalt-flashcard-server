async function awardUser({
  userId,
  awardId,
}: {
  userId: string;
  awardId: string;
}) {}

async function awardDeck({
  deckId,
  awardId,
}: {
  deckId: string;
  awardId: string;
}) {}

export const awardsService = {
  awardUser,
  awardDeck,
};
