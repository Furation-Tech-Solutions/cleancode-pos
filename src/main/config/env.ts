
<<<<<<< HEAD
require("dotenv").config();
export default {
  port: process.env.PORT ?? 8081,
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongodb:27017/catalog'
}
=======
require('dotenv').config()

export default {

  port: process.env.PORT ?? 3000,
  mongoUrl: process.env.MONGO_URL ?? "mongodb://mongodb:27017/catalog"
};

>>>>>>> 9365e4df6b49e52f29cf06d1f37f407ae66a2a08
