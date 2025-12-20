import User from "@/models/user.mongo.js";
import bcrypt from "bcrypt";
import { signPayload } from "@/utils/jwt.utils.js";

async function Signup(userData) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userData.password, salt);

  const userCreated = new User({
    email: userData.email,
    name: userData.name,
    password: hash,
    phone: userData.phone,
  });

  const user = await userCreated.save();
  const signedData = await signPayload({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    signedData,
  };
}

async function Signin(userData) {
  try {
    const userExists = await User.findOne({
      email: userData.email,
    }).exec();

    if (!userExists) {
      return null;
    } else {
      const passwordCheck = bcrypt.compareSync(
        userData.password,
        userExists.password
      );
      if (!passwordCheck) {
        return null;
      }
      const signedData = await signPayload({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
      });
      return {
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        signedData,
      };
    }
  } catch (error) {
    console.error("ERROR: ", error);
    return null;
  }
}

export { Signup, Signin };
