import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Custom required message
    unique: true,
    lowercase: true, // Convert email to lowercase before saving
    trim: true, // Remove leading/trailing whitespace
    validate: {
      validator: function (v) {
        // Regular expression for basic email validation
        return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`, // Custom validation message
    },
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
