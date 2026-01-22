const router = require("express").Router();
const UserModel = require("../models/User.model");

//route to signup a new user (/signup)
router.post("/signup", (req, res) => {
  UserModel.create(req.body)
    .then((userCreated) => {
      res
        .status(201)
        .json({ message: "User created successfully!", data: userCreated });
    })
    .catch((err) => {
      res.status(500).json({ errorMesage: err });
    });
});

module.exports = router;
