const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const Snake = require("../models/Snake");

// @route GET api/snake
// @desc Get ALL scores
// @access Public
router.get("/", async (req, res) => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    const scores = await Snake.find()
      .sort({
        score: -1
      })
      .limit(30);
    console.log(scores.length);
    for (let [index, value] of scores.entries()) {
      console.log(value._id);
      console.log(index);
    }
    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/snake/today
// @desc Get TODAYS scores
// @access Public
router.get("/today", async (req, res) => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    const scores = await Snake.find({ date: { $gte: start, $lt: end } })
      .sort({
        score: -1
      })
      .limit(5);
    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/snake/:id
// @desc Get score position
// @access Public
router.get("/:id", async (req, res) => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    const scores = await Snake.findById(req.params.id);
    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/snake
// @desc Add new score
// @access Public
router.post(
  "/",
  [
    check("name", "Imię/Nick gracza jest wymagane")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "What went wrong": errors.array() });
    }
    const { name, score } = req.body;

    try {
      const newScore = new Snake({
        name,
        score
      });
      const scoreSaved = await newScore.save();
      res.json(scoreSaved);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
