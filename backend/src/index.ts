import express from "express";
import userRouter from "./routes/user.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";
import balanceRouter from "./routes/balance.route.js";
import transactionRouter from "./routes/transaction.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/balance", balanceRouter);
app.use("/transaction", transactionRouter);
app.get("/", (req, res) => {
  res.send({
    message: "Server is up and running!!!",
  });
});

app.listen(8000, async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("CONNECTED TO DB: ");
  } catch (error) {
    console.log("Error of connection is: ", error);
  }
  console.log("Server is runnign at port 8000");
});
