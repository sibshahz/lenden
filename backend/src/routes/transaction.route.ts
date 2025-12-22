import express from "express";
// import { validate } from "@/middlewares/zod.validation.js";
import { transferAmount } from "@/controllers/transaction.controller.js";
import { checkAuth } from "@/middlewares/auth.js";

const transactionRouter = express.Router();

transactionRouter.post("/transfer", checkAuth, transferAmount);

export default transactionRouter;
