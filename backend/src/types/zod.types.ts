import * as z from "zod";

const ZodValidations = {
  "/signup": z.object({
    name: z.string("Please provide a name value"),
    email: z.email(),
    password: z.string(),
    phone: z.string(),
  }),
  "/signin": z.object({
    email: z.email("Please provide a valid email"),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .max(32, { message: "Must be 32 or fewer characters long" }),
  }),
};

export { ZodValidations };

// // some untrusted data...
// const input = {
//   /* stuff */
// };

// // the parsed result is validated and type safe!
// const data = User.parse(input);

// // so you can use it with confidence :)
// console.log(data.name);
