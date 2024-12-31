const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Import the User model

async function registerUser(username, firstname, lastname, email, password) {
  const [user] = await User.findByUsernameOrEmail(username, email);

  if (user.length > 0) {
    return { status: 400, msg: "User already exists" };
  }

  if (password.length < 8) {
    return { status: 400, msg: "Password must be at least 8 characters" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create(username, firstname, lastname, email, hashedPassword);

  return { status: 201, msg: "User registered successfully" };
}

async function loginUser(email, password) {
  const [user] = await User.findByEmail(email);

  if (user.length === 0) {
    return { status: 400, msg: "Invalid credentials!" };
  }

  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    return { status: 400, msg: "Invalid credentials!" };
  }

  const username = user[0].username;
  const userid = user[0].userid;
  const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { status: 200, msg: "User login successful", token, username };
}

module.exports = { registerUser, loginUser };
