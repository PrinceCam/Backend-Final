const express = require('express');
const router = express.Router();
const User = require('../model/User'); 
const bcrypt = require('bcrypt');
const passport = require('passport');


router.post('/register', async (req, res) => {
  console.log("REG HIT", req.body)
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("hashPass", hashedPassword)
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });

    console.log("user", user)

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



router.post('/login',  (req, res) => {
  console.log("login hit", req.body)
  res.json({ msg: 'good login' });
});

module.exports = router;