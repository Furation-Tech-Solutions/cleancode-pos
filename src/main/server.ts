import "module-alias/register";
import setupApp from "@main/config/app";
import env from "@main/config/env";
import mongoose from "mongoose";

<<<<<<< HEAD
const app = setupApp();

const dbURL = env.mongoUrl;

// Set up the required options for the connection
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "iRestoNew", // Replace with the name of your database
  // Other options like user and password can also be added if necessary
};

=======
const dbURL = env.mongoUrl;
// const dbURL = "mongodb+srv://satansharma:satansharma@cluster0.ncc9mtu.mongodb.net/?retryWrites=true&w=majority";
// Set up the required options for the connection
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "iRestoNew", // Replace with the name of your database
  // Other options like user and password can also be added if necessary
};

>>>>>>> 9365e4df6b49e52f29cf06d1f37f407ae66a2a08
// Create the mongoose connection
mongoose.connect(dbURL, dbOptions).then(() => {
  console.log("Connected to MongoDB successfully!");
});



app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> 9365e4df6b49e52f29cf06d1f37f407ae66a2a08
