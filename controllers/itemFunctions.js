const Items = require("../db/models/Items");
const User = require("../db/models/User");

const creteNewItem = async (req, res) => {
  try {
    const data = req.body.token;
    // checks if the user exists
    let user = await User.findOne({ _id: data.OwnerId });

    const newItem = {
      displayName: data.displayName,
      description: data.description,
      ownerID: data.OwnerId,
      price: data.price,
      displayImage: data.displayImage,
      ownerUsername: data.username,
    };

    // If it does, it creates the new item
    if (user) {
      const item = await Items.create(newItem);
      res.status(201).send(item);
      return;
    } else {
      res.status(404).send({ error: "User Not Found" });
      return;
    }
  } catch (err) {
    res.status(404).send({ success: false });
  }
};

// Delets single Item
const deleteItem = async (req, res) => {
  try {
    const item = await Items.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).send({ success: false });
      return;
    } else {
      res.status(200).send({ success: true });
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

const modifyItem = async (req, res) => {
  try {
    const newItem = req.body.token;
    const item = await Items.findById(newItem._id);
    item.displayName = newItem.displayName;
    item.description = newItem.description;
    item.price = newItem.price;
    item.displayImage = newItem.displayImage;
    await item.save();
    res.status(200).send(item);
  } catch (error) {
    console.log(error);
  }
};

const buyItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { offer } = req.body;
    // Gets all instances needede in the db
    const item = await Items.findById(id);
    const buyer = await User.findById(offer);
    const seller = await User.findById(item.ownerID);

    // If all where found, proceed
    if (item && buyer && seller) {
      // Checks if the values are correct
      if (item.price > buyer.balance) {
        res.status(400).send({ error: "Not enough Money" });
        return;
      }
      if (item.ownerID === buyer.id) {
        res.status(400).send({ error: "Cannot buy your own item" });
        return;
      }

      // makes modifications (Changes ownership and currency) and saves them
      buyer.balance -= item.price;
      seller.balance += item.price;
      item.lastPrice = item.price;
      item.ownerID = buyer._id;
      item.ownerUsername = buyer.displayName;

      await buyer.save();
      await item.save();
      await seller.save();

      res.status(200).send({ buyer, item, seller });
      return;
    }
    res.status(404).send({ item, buyer });
    return;
  } catch (err) {
    console.log(err);
  }
};

// Return requested user info and It's items
const getProfileInformation = async (req, res) => {
  try {
    const data = req.params;
    const user = await User.findOne({ _id: data.id });
    if (user) {
      const items = await Items.find({ ownerID: data.id });
      res.status(201).send({ user, items });
      return;
    } else {
      res.status(404).send({ success: false });
    }
  } catch (err) {
    res.status(404).send({ success: false });
  }
};

// Returns all items
const getAllItems = async (req, res) => {
  const items = await Items.find({});
  items.reverse();
  res.status(200).json({ items });
};

module.exports = {
  creteNewItem,
  getProfileInformation,
  deleteItem,
  buyItem,
  getAllItems,
  modifyItem,
};
