import express from "express";
import { Signup, Signin } from "@/controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const userCreated = await Signup();
  res.send({
    user: userCreated,
  });
});

userRouter.post("/signin", (req, res) => {
  const tokenCreated = Signin();
  res.send({
    token: tokenCreated,
  });
});

export default userRouter;
