const express = require("express");
const router = express.Router();
const Products = require("../models/products.json");

// @route GET api/todos
// @desc Get all todos
// @access Public
router.get("/", async (req, res) => {
  try {
    res.json(Products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
