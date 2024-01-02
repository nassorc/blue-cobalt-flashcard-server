import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { buildServer } from "../../src/lib/buildServer";
import HttpStatus from "../../src/lib/httpStatus";
import { UserType } from "../../src/app/user/Schema";
import UserModel from "../../src/app/user/Users";
import testServer from "../helpers/testServer";

let mongodb: MongoMemoryServer;
let testUser: UserType & { rawPassword: string };

beforeAll(async () => {
  mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();
  mongoose.connect(uri);
});

beforeEach(async () => {
  let user = {
    email: "test@gmail.com",
    password: "test123",
  };
  let created = await UserModel.create(user);

  let res = await UserModel.find({
    _id: created._id,
  });
  testUser = res[0].toJSON();
  testUser.rawPassword = user.password;
});
afterEach(async () => {
  await mongoose.connection.dropCollection("users");
});
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongodb.stop();
});

afterAll(async () => {
  await mongodb.stop();
});

// describe("test memory server", () => {
//   it("should create a user", async () => {
//     const res = await request(buildServer()).post("/user/test/create").send({});
//     expect(res.status).toBe(HttpStatus.CREATED);
//     expect(res.body).toHaveProperty("user");
//   });
//   it("should get a user", async () => {
//     const res = await request(buildServer()).get("/user/test/get").send();
//     expect(res.status).toBe(HttpStatus.OK);
//     expect(res.body).toBe({});
//   });
// });

function parseCookies(headers: Headers) {
  return Object.fromEntries(
    headers
      .get("set-cookie")
      ?.split(",")
      .map((entry) => entry.split(";"))
      .filter((elms) => elms.join("").includes("="))
      .map((elms) => elms[0])
      .map((elms) => elms.split("=")) || []
  );
}

describe("deck integration", () => {
  describe("POST /deck/:deckId/card/:cardId/grade", () => {
    describe("given valid `deckId` and `cardId` request params", () => {
      it("should respond with a 200", () => {
        expect(true).toBe(true);
      });
    });

    describe("given valid payload", () => {
      it("should call DeckService.gradeCard once", () => {
        expect(true).toBe(true);
      });
      it("should call DeckService.gradeCard once", () => {
        expect(true).toBe(true);
      });
      it("should call the practice function once", () => {
        expect(true).toBe(true);
      });
      it("should update the database", async () => {
        const response = await request(testServer).post("/user/login").send({
          email: testUser.email,
          password: testUser.rawPassword,
        });

        let header = new Headers(response.header);

        const cookies = parseCookies(header);

        const me = await request(testServer)
          .get("/user/me")
          .set(
            "Cookie",
            `accessToken=${cookies["accessToken"]};refreshToken=${cookies["refreshToken"]}`
          )
          .withCredentials(true)
          .send();
        console.log(await me.body);

        expect(true).toBe(false);
      });
    });
  });

  describe("POST /deck/", () => {
    describe("given valid payload", () => {
      it("should respond with a 201", () => {
        expect(true).toBe(true);
      });
      it("should create a task entry in the database", () => {
        expect(true).toBe(true);
      });
      it("should call DeckService.create once", () => {
        expect(true).toBe(true);
      });
      it("should create a deck entry in the database", () => {
        expect(true).toBe(true);
      });
    });

    describe("given payload contains a deck image", () => {
      it("upload the image", () => {
        expect(true).toBe(true);
      });
    });

    describe("given aiAssist is set to true on the payload", () => {
      it("should call the AI handler once", () => {
        expect(true).toBe(true);
      });
      it("should generate flashcards", () => {
        expect(true).toBe(true);
      });
      it("should save the generated flashcards in the database", () => {
        expect(true).toBe(true);
      });
    });
  });
});

describe("Server Status", () => {
  describe("GET /status", () => {
    describe("server is functional", () => {
      it("should return true", async () => {
        const response = await request(buildServer()).get("/status").send();
        expect(response.status).toBe(HttpStatus.OK);
      });
    });
  });
});
