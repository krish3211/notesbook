const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Krishnaisagood$boy";

// Route 1: Create a new user method: post "/api/auth/createuser"
router.post("/createuser",
  [
    body("name", "Invalid username").isLength({ min: 3, max: 10 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors , return bed 404 request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false,error: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success:false, error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(5);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create a new collection in database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // .then(user => res.json(user))
      // .catch(err=>{
      //   console.log(err)
      // res.json({error:"Please enter unique value for email"})})
      // res.json({user})
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({success:true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 2: Authenticate a User using : post"/api/auth/login".
router.post("/login",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors , return bed 404 request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // user email comparing
      if (!user) {
        return res
          .status(400)
          .json({success:false, error: "Please try to login with corrent credentials" });
      }
      // password checking and comparing with data
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success:false, error: "Please try to login with corrent credentials" });
      }
      // jwt tokent convert
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success:true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Get loggerin User Details using : post"/api/auth/getuser".
router.post("/getuser", fetchuser ,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
