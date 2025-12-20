import jwt from "jsonwebtoken";
import "dotenv/config";

const PRIVATE_KEY = process.env.JWT_SECRET;
export async function signPayload(payload) {
  const signedPayload = jwt.sign(payload, PRIVATE_KEY);
  return signedPayload;
}
