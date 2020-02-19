const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Products = require("../models/products.json");
const ProductsOrder = require("../models/ProductsOrder");

// @route GET api/products
// @desc Get all products
// @access Public
router.get("/", async (req, res) => {
  try {
    res.json(Products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/products/:id
// @desc GET Get order by ID
// @access Private NOT YET

router.get("/:id", async (req, res) => {
  try {
    const order = await ProductsOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Post does not exist" });
    }
    res.json(order);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post does not exist" });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/products
// @desc Add new ORDER
// @access Public //@todo - private//
router.post(
  "/",
  [
    check("email", "email is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "What went wrong": errors.array() });
    }
    const { name, email, theCart } = req.body;

    try {
      const newOrder = new ProductsOrder({
        name,
        email,
        theCart
      });
      const order = await newOrder.save();
      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
