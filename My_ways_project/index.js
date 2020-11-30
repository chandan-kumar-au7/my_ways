import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import "./Models";

const app = express();

import userAuthRoute from "./Routes/userRoute";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
} else {
  // IN DEVLOPMENT MODE ONLY
  app.use(morgan("dev"));
}

app.use("/user", userAuthRoute);

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
  next();
});

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
