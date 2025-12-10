import express from "express";
import userRouter from "./routes/user.route.js";
import mongoose from "mongoose";

const app = express();

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send({
    message: "Server is up and running!!!",
  });
});

app.listen(8000, async () => {
  try {
    await mongoose.connect(
      "mongodb://user:password@127.0.0.1:27017/lendendb?authSource=admin"
    );
  } catch (error) {
    console.log("Error of connection is: ", error);
  }
  console.log("Server is runnign at port 8000");
});
