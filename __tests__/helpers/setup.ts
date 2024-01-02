import seed from "../../src/config/db/seed";

beforeEach(async () => {
  jest.clearAllMocks();
  await seed();
});
