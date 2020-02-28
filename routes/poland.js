const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Poland = require("../models/Poland");

// @route GET api/poland
// @desc Get all details
// @access Public
router.get("/", async (req, res) => {
  try {
    const poland = await Poland.find().sort({
      name: 1
    });
    res.json(poland);
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
    check("place", "place is required")
      .not()
      .isEmpty(),
    check("addInfo", "addInfo is required")
      .not()
      .isEmpty(),
    check("community", "community is required")
      .not()
      .isEmpty(),
    check("county", "county is required")
      .not()
      .isEmpty(),
    check("voivodeship", "voivodeship is required")
      .not()
      .isEmpty(),
    check("ID", "ID is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "What went wrong": errors.array() });
    }
    const { place, addInfo, community, county, voivodeship, ID } = req.body;

    try {
      const newPlace = new Poland({
        place,
        addInfo,
        community,
        county,
        voivodeship,
        ID
      });
      const placeInDB = await newPlace.save();
      res.json(placeInDB);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
