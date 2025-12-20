import express from "express";
import { validate } from "@/middlewares/zod.validation.js";
import {
  addBalance,
  withDrawBalance,
} from "@/controllers/balance.controller.js";
import { checkAuth } from "@/middlewares/auth.js";

const balanceRouter = express.Router();

balanceRouter.post("/add", checkAuth, addBalance);
balanceRouter.post("/withdraw", checkAuth, withDrawBalance);

export default balanceRouter;
