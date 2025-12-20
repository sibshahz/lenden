import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
export async function checkAuth(req, res, next) {
  const token = req.cookies.AUTH_JWT;
  try {
    const isValidToken = jwt.verify(token, JWT_SECRET);
    req.user = isValidToken;
    console.log("USER OBJECT ATTAchED", req.user);
    next();
  } catch (error) {
    res.send("AUTH CHECK FAILED");
  }
}
