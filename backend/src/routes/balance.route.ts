import express from "express";
import { validate } from "@/middlewares/zod.validation.js";
import {
  addBalance,
  withDrawBalance,
  checkBalance,
} from "@/controllers/balance.controller.js";
import { checkAuth } from "@/middlewares/auth.js";

const balanceRouter = express.Router();

balanceRouter.post("/add", checkAuth, addBalance);
balanceRouter.get("/check", checkAuth, checkBalance);
balanceRouter.post("/withdraw", checkAuth, withDrawBalance);

export default balanceRouter;
