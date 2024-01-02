import request from "supertest";
import testServer from "./testServer";

async function authenticateUser(credentials: {
  email: string;
  password: string;
}) {
  const res = await request(testServer).post("/user/login").send(credentials);
}
