export function generateId() {
  return require("crypto").randomBytes(10).toString("hex")
}
export function Async(promise) {
  return new Promise((resolve, reject) => {
    return promise.then(data => resolve([data])).catch(err => reject([null, err]))
  })
}
