import Balance from "@/models/balance.mongo.js";
import User from "@/models/user.mongo.js";

export async function transferAmount(req, res) {
  // Check if sender exists
  // else send error
  // Check if reciever exists
  // else send error
  // Check if sender has required balance
  // else send error
  //check if reciever has balance document
  // if not create one
  // else update the balance
  // response success


 // 1. getting email of reciver and amount which is to be transfred
const recieverEmail=req.body.email;
const amountToTransfer=req.body.amount;

// 2. checking for sender existance in Balance collection
 const senderExists = await Balance.findOne({
    user: req.user._id,
  }).exec();
  if (!senderExists) {
    res.send({
      error: "SENDER ACCOUNT DIDN'T EXISTS",
    });
    return;
  }

  // 3. chedked reciever existance in User collection, bcz balance document may or may not exist for reciever
  const recieverExists = await User.findOne({
    email: recieverEmail,
  }).exec();
  if (!recieverExists) {
    res.send({
      error: "RECIEVER ACCOUNT DIDN'T EXISTS",
    });
    return;
  }

  // 4. checking either sender has sufficient balance which he wants to send to other user
  if (senderExists && senderExists.amount < amountToTransfer) {
    res.send({
      error: "INSUFFICIENT BALANCE",
    });
    return;
  }



  // 5. updating reciever balamce if its already exists in Balance collection otherwise creating new balance document
    const RecieverbalanceExists = await Balance.findOne({
      user: recieverExists._id,
    }).exec();
    if (RecieverbalanceExists) {
      const updatedRecieverBalance = await Balance.findOneAndUpdate(
        {
          user: recieverExists._id,
        },
        {
          amount:
            Number(RecieverbalanceExists.amount) + Number(amountToTransfer),
        }
      );
      await updatedRecieverBalance.save();
    } else {
      const balanceCreated = new Balance({
        amount: amountToTransfer,
        user: recieverExists._id,
      });
      await balanceCreated.save();
    }

    // 6. updating sender balance (deducted transferred amount) and provideing successful response
    const updatedSenderBalance = await Balance.findOneAndUpdate(
      {
        user: req.user._id,
      },
      {
        amount: Number(senderExists.amount) - Number(amountToTransfer),
      }
    );
    await updatedSenderBalance.save();
    res.send({
      message: "AMOUNT TRANSFERRED SUCCESSFULLY",
    });

}
