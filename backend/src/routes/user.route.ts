import express from "express";
import { Signup, Signin } from "@/controllers/user.controller.js";
import { validate } from "@/middlewares/zod.validation.js";

const userRouter = express.Router();

userRouter.post("/signup", validate, async (req, res) => {
  const userData = req.body;
  const userCreated = await Signup(userData);
  res.cookie("AUTH_JWT", userCreated.signedData, {
    httpOnly: true, // This makes the cookie inaccessible to JavaScript
  });

  res.send({
    user: userCreated._id,
    name: userCreated.name,
    email: userCreated.email,
  });
});

userRouter.post("/signin", validate, async (req, res) => {
  const signInReq = await Signin(req.body);
  if (signInReq == null) {
    res.send({
      error: "User does not exists or password is incorrect",
    });
    return;
  } else {
    res.cookie("AUTH_JWT", signInReq.signedData, {
      httpOnly: true, // This makes the cookie inaccessible to JavaScript
    });

    res.send({
      user: signInReq._id,
      name: signInReq.name,
      email: signInReq.email,
    });
  }
});

export default userRouter;
