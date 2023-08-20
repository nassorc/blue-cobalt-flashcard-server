import "dotenv/config"
const config = {
  api: {
    token: {
      at_name: "accessToken",
      at_secret: process.env.AT_SECRET_KEY,
      at_ttl: process.env.AT_TTL,
      rt_name: "refreshToken",
      rt_secret: process.env.RT_SECRET_KEY,
      rt_ttl: process.env.RT_TTL,
    }
  }
}
export default config