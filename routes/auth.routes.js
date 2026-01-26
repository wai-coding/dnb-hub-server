const router = require("express").Router();
const UserModel = require("../models/User.model");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

//route to signup a new user (/signup)
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      res.status(403).json({ errorMessage: "Email already in use." });
    } else {
      const theSalt = bcryptjs.genSaltSync(12);
      const theHashedPassword = bcryptjs.hashSync(password, theSalt);
      const hashedUser = {
        ...req.body,
        password: theHashedPassword,
      };
      const createdUser = await UserModel.create(hashedUser);
      res.status(201).json(createdUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//route to login a user (/login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      res.status(403).json({ errorMessage: "Invalid Credentials" });
    } else {
      const doesPasswordsMatch = bcryptjs.compareSync(
        password,
        foundUser.password,
      );
      if (!doesPasswordsMatch) {
        res.status(403).json({ errorMessage: "Invalid Credentials" });
      } else {
        const payload = { _id: foundUser._id };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "30d",
        });
        res.status(200).json({ message: "You are now logged in.", authToken });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//route to verify a user (/verify)
router.get("/verify", isAuthenticated, async (req, res) => {
  const currentLoggedInUser = await UserModel.findById(req.payload._id).select(
    "-password -email",
  );
  res.status(200).json({ message: "Token is valid.", currentLoggedInUser });
});

module.exports = router;
