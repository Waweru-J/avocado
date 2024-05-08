const express = require("express");
const bcrypt = require("bcrypt");
const Avocado = require("../schema/Avocados.js");
const Review = require("../schema/Review.js");
const User = require("../schema/Users.js");
const Admin = require("../schema/Admin.js");

const router = express.Router();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, "your_secret_key", {
    expiresIn: "1h",
  });
  return token;
};

// Handle POST request to /signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, phone, password, cpassword } = req.body;

    if (!username || !email || !phone || !password || !cpassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (password !== cpassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    let newUser = new User({
      username,
      phone,
      email,
      password: hashedPassword,
      cpassword: hashedPassword,
    });

    newUser = await newUser.save();
    const token = generateToken(newUser);
    res.status(200).json({
      success: true,
      message: "Farmer registered successfully.",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});

// Handle POST request to /login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password.trim(),
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = generateToken(existingUser);
    console.log(token);

    return res.status(200).json({ success: true, token, user: existingUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//Admin Signin
router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    const isPasswordMatch = await bcrypt.compare(
      password.trim(),
      admin.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const adminToken = generateToken(admin);
    console.log(adminToken);

    return res.status(200).json({ success: true, adminToken, admin });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// routes/sell.js

router.post("/sell", async (req, res) => {
  try {
    const {
      variety,
      location,
      photos,
      harvestTimes,
      farmsize,
      description,
      price,
      produceQuality,
      userId,
      username,
      email,
      phone,
    } = req.body;
    if (!userId || !email || !phone || !username) {
      return res
        .status(400)
        .json({ success: false, message: "User details are required" });
    }

    if (
      !variety ||
      !location ||
      !harvestTimes ||
      !farmsize ||
      !description ||
      !price ||
      !produceQuality
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newAvocado = new Avocado({
      variety,
      location,
      photos,
      harvestTimes,
      farmsize,
      description,
      price,
      produceQuality,
      userId,
      phone,
      username,
      email,
    });

    // Save the new avocado without reassigning the constant variable
    const savedAvocado = await newAvocado.save();

    res.status(200).json({
      success: true,
      message: "Avocado listed successfully",
    });
  } catch (error) {
    console.error("Error listing Avocado:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// routes/review

router.post("/reviews", async (req, res) => {
  try {
    const { userId, rating, comment, username } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Sign in to make a review" });
    }
    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: "Please Comment to make a review" });
    }
    if (!rating) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please include rating to make a review",
        });
    }

    const newReview = new Review({
      userId,
      rating,
      comment,
      username,
    });
    const savedReview = await newReview.save();

    res.status(200).json({
      success: true,
      message: "Reviewed successfully",
    });
  } catch (error) {
    console.error("Error listing Review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//Feth All Avocados
router.get("/avocados/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const avocados = await Avocado.find({ userId });
    res.status(200).json(avocados);
  } catch (error) {
    console.error("Error fetching posted avocados:", error);
    res.status(500).json({ message: "Error fetching posted avocados" });
  }
});

//Feth All Avocados
// Fetch reviews by userId
router.get("/reviews/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.find({ userId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});
//Feth All Avocados
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching system users:", error);
    res.status(500).json({ message: "Error registered users" });
  }
});

//Feth All Avocados
router.get("/avocados", async (req, res) => {
  try {
    const avocados = await Avocado.find();
    res.status(200).json(avocados);
  } catch (error) {
    console.error("Error fetching posted avocados:", error);
    res.status(500).json({ message: "Error fetching posted avocados" });
  }
});

//Fetch Avocados by Id
router.get("/products/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Avocado.findById(id);
    console.log(product);
    if (!product) {
      return res
        .status(404)
        .json({ message: "No product with that ID found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error getting product by ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: `Error getting product by ID ${req.params.id}` });
  }
});

router.delete("/user/remove/:id", async (req, res) => {
  try {
    const data = await User.deleteOne({ _id: req.params.id });
    if (data.deletedCount === 0) {
      return res.send({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});
router.delete("/remove/avocado/:id", async (req, res) => {
  try {
    const data = await Avocado.deleteOne({ _id: req.params.id });
    if (data.deletedCount === 0) {
      return res.send({ success: false, message: "Avocado not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
