import mongoose from "mongoose";

import userSchema from "./userSchema";

const conn = mongoose.createConnection(
  "mongodb+srv://Chandan_Kumar:9110130860@cluster0.eunix.azure.mongodb.net/MY_WAYS_DB?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      return console.log("DataBase Connected");
    }
  }
);

conn.model("User", userSchema);

export const UserModel = conn.models.User;
