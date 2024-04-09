// router.js
const express = require("express");
const auth = require("./auth.js");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({ message: "success" });
});

router.use("/auth", auth);

module.exports = router;
