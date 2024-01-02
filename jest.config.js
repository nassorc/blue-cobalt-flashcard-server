/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  detectOpenHandles: true,
  roots: ["./__tests__/integration"],
  setupFilesAfterEnv: ["./__tests__/helpers/setup.ts"],
};
