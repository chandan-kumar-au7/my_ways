import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import "./Models";

const app = express();

import userAuthRoute from "./Routes/userRoute";

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./views/build"));
} else {
  // IN DEVLOPMENT MODE ONLY
  app.use(morgan("dev"));
}

app.use("/user", userAuthRoute);

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/views/build/index.html"));
  next();
});

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
