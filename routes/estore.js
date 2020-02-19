const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const eShelf = require("../models/estoreShelf");

// @route GET api/estore
// @desc Get all products
// @access Public
router.get("/", async (req, res) => {
  try {
    const productsOnShelf = await eShelf.find().sort({
      date: -1
    });
    res.json(productsOnShelf);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/posts/:id
// @desc GET Get post by ID
// @access Private NOT YET

router.get("/:id", async (req, res) => {
  try {
    const SKU = await eShelf.find({ id: req.params.id });
    if (!SKU) {
      return res.status(404).json({ msg: "SKU does not exist" });
    }
    res.json(SKU);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "ObjectID does not exist" });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/estore
// @desc Add new ORDER
// @access Public //@todo - private//
router.post(
  "/",
  [
    check("id", "id is required")
      .not()
      .isEmpty(),
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("description", "Description is required")
      .not()
      .isEmpty(),
    check("price", "Price is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "What went wrong": errors.array() });
    }
    const { id, name, description, keywords, image, age, price } = req.body;

    if (keywords) {
      listOfKeywords = keywords.split(",").map(keyword => keyword.trim());
    }
    try {
      const newSKU = new eShelf({
        id,
        name,
        description,
        keywords: listOfKeywords,
        image,
        age,
        price
      });
      const SKUinDB = await newSKU.save();
      res.json(SKUinDB);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
