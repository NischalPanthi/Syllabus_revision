const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(hashedPassword);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Unable to create user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(401).json("Wrong Username");
    }
    const verify = await bcrypt.compare(req.body.password, user.password);
    if (!verify) {
      return res.status(404).json("Invalid Password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
