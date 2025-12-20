import Balance from "@/models/balance.mongo.js";
export async function addBalance(req, res) {
  // if balance already exists with id
  const balanceExists = await Balance.findOne({
    user: req.user._id,
  }).exec();
  if (balanceExists) {
    const updatedBalance = await Balance.findOneAndUpdate(
      {
        user: req.user._id,
      },
      {
        amount: Number(balanceExists.amount) + Number(req.body.amount),
      }
    );
    await updatedBalance.save();
    res.send({
      update: updatedBalance,
    });
  } else {
    const balanceCreated = new Balance({
      amount: req.body.amount,
      user: req.user._id,
    });
    const savedBalance = await balanceCreated.save();
    res.send({
      newBalance: savedBalance,
    });
  }

  // then update old amount plus new amount
  // else create new balance with amount
  // res.send({
  //   success: addedBalance,
  // });
}

export function withDrawBalance() {
  return;
}
