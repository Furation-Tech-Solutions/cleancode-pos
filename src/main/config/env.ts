
require("dotenv").config();
export default {
  port: process.env.PORT ?? 8081,
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongodb:27017/catalog'
}
