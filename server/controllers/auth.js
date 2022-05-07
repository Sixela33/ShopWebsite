const User = require("../db/models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// Handling Google login
const loginFunction = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });

    const data = ticket.payload;
    const user = await checkUser(data);
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false });
  }
};

// Checks if the user is in the database
const checkUser = async ({ given_name, email, picture }) => {
  const newUser = {
    displayName: given_name,
    email: email,
    image: picture,
  };

  let user = await User.findOne({ email: email });
  if (user) {
    return user;
  } else {
    user = await User.create(newUser);
    return user;
  }
};

module.exports = {
  loginFunction,
};
