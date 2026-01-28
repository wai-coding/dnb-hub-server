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

//route to update user profile (/profile)
router.put("/profile", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const { username, profilePicture } = req.body;

    // Build update object with only allowed fields (ignore empty strings)
    const updateData = {};
    if (username && username.trim() !== "") {
      updateData.username = username.trim();
    }
    if (profilePicture && profilePicture.trim() !== "") {
      updateData.profilePicture = profilePicture.trim();
    } else if (profilePicture === "") {
      // Allow clearing profile picture
      updateData.profilePicture = "";
    }

    // If no valid fields to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ errorMessage: "No valid fields to update." });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ errorMessage: "User not found." });
    }

    res.status(200).json({ message: "Profile updated.", user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Failed to update profile." });
  }
});

module.exports = router;
