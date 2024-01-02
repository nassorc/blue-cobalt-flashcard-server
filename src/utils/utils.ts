export function generateId() {
  return require("crypto").randomBytes(10).toString("hex");
}
