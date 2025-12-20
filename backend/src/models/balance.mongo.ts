import mongoose, { Schema } from "mongoose";

const balanceSchema = new Schema({
  amount: {
    type: Number,
    default: 0,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Balance = mongoose.model("Balance", balanceSchema);

export default Balance;
