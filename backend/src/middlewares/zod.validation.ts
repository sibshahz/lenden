import { ZodValidations } from "@/types/zod.types.js";
import * as z from "zod";

export function validate(req, res, next) {
  console.log("REq url is: ", req.url);
  const zodValidationType = ZodValidations[req.url].safeParse(req.body);
  if (zodValidationType.success == true) {
    next();
  } else {
    res.send(zodValidationType.error);
  }
}
