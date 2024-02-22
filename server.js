import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import notFoundMiddleWare from "./middlewares/notFound.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import userAuthRouter from "./routes/userAuthRoutes.js";
import mongoose from "mongoose";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth/user", userAuthRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    const port = process.env.PORT || 5000;

    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database Connected"))
      .catch((err) => console.log("errors", err));
    app.listen(port, () => {
      console.log("Server Started on " + port + " Port");
    });
  } catch (error) {
    console.log("DataBase Error" + error);
  }
};

start();
