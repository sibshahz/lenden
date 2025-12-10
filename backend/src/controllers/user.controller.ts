import User from "@/models/user.mongo.js";
async function Signup() {
  const userCreated = new User({
    email: "abc@gmail.com",
    name: "Zahid",
    password: "639851136adsfh",
    phone: "+92635854644",
  });
  const user = await userCreated.save();
  return user;
}

function Signin() {
  return {
    token: "1asdkhfashfsadf2as3df6131",
  };
}

export { Signup, Signin };
