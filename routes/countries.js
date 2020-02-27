const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Countries = require("../models/Countries");

// @route GET api/countries
// @desc Get all countries
// @access Public
router.get("/", async (req, res) => {
  try {
    const countries = await Countries.find().sort({
      name: 1
    });
    res.json(countries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/countries
// @desc Add new country
// @access Public //@todo - private//
router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("code", "code is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "What went wrong": errors.array() });
    }
    const { name, code } = req.body;

    try {
      const newCountry = new Countries({
        name,
        code
      });
      const countryInDB = await newCountry.save();
      res.json(countryInDB);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
