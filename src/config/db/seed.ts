import { faker } from "@faker-js/faker";
import UserModel from "../../app/user/Users";
import Deck from "../../app/deck/Deck";

function createUser() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

function createDeck({ userId }: { userId: string }) {
  return {
    deckName: "test deck",
    owner: userId,
    cards: [
      {
        front: "front",
        back: "back",
        status: "reviewed",
        interval: 1,
        repetition: 1,
        efactor: 2.5,
      },
    ],
    deckImage: faker.image.avatar,
    deckImageName: faker.string.sample(),
    blurhash: faker.string.sample(),
    deckSettings: {
      reviewCards: 10,
      newCards: 5,
      visibility: "public",
    },
  };
}

type SeedUserReturnType = ReturnType<typeof createUser> & { _id: string };
let users: SeedUserReturnType[] = [];

async function seed() {
  for (let i = 0; i < 3; i++) {
    let user = createUser();
    let createdUser = await UserModel.create(user);
    let deck = await Deck.create(
      createDeck({ userId: createdUser._id.toString() })
    );
    users.push({ ...user, _id: createdUser.toJSON()._id.toString() });
  }
}
export { users };
export default seed;
