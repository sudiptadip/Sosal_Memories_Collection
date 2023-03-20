const { newusers } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await newusers.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "User already exist" });
    if (password !== confirmPassword)
      return res.status(400).send({ message: "Password dose not match" });

    const hashPassword = await bcrypt.hash(password, 5);
    const result = await newusers.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "secret_key",
      { expiresIn: "1h" }
    );
    res.status(200).send({ result: result, token });
  } catch (error) {
    res.status(500).send({ mesage: "something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await newusers.findOne({ email });
    if (!existingUser)
      return res.status(404).send({ message: "User dose not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).send({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret_key",
      { expiresIn: "1h" }
    );
    res.status(200).send({ result: existingUser, token });
  } catch (error) {
    res.status(500).send({ mesage: "something went wrong" });
  }
};

module.exports = {
  signup,
  signin,
};
