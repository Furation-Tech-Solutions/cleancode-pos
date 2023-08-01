require("dotenv").config()
export default {
  port: process.env.PORT ?? 8080,
  mongoUrl: process.env.MONGO_URL ?? 'mongodb+srv://satansharma:satansharma@cluster0.ncc9mtu.mongodb.net/iRestoNews?retryWrites=true&w=majority'
}
