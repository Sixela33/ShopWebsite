const User = require("../db/models/User");

// Adds coins to an account
const addMoney = async (req, res) => {
  try {
    const { id } = req.params;
    const { balance } = req.body;

    let user = await User.findById(id);
    console.log(user);
    user.balance += balance;
    user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addMoney };
