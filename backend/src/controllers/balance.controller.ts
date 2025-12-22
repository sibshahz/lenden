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
}

export async function checkBalance(req, res) {
  const userid = req.user._id;
  const userBalance = await Balance.findOne({
    user: userid,
  }).exec();
  res.send({
    user: userid,
    balance: userBalance.amount,
  });
}

export async function withDrawBalance(req, res) {
  // if balance already exists with id
  const withDrawAmount = req.body.amount;
  const userExists = await Balance.findOne({
    user: req.user._id,
  }).exec();
  if (!userExists) {
    res.send({
      error: "ACCOUNT DOES NOT EXISTS",
    });
    return;
  }
  if (userExists && userExists.amount < withDrawAmount) {
    res.send({
      error: "INSUFFICIENT BALANCE",
    });
    return;
  }

  const updatedBalance = await Balance.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      amount: Number(userExists.amount) - Number(withDrawAmount),
    }
  );

  await updatedBalance.save();
  res.send({
    user: req.user._id,
    balance: Number(userExists.amount) - Number(withDrawAmount),
  });
  return;
}
