const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const Todo = require("../models/Todo");

// @route GET api/todos
// @desc Get all todos
// @access Public
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({
      date: -1
    });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/todos
// @desc Add new todo
// @access Public
router.post(
  "/",
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("id", "ID is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "What went wrong": errors.array() });
    }
    const { title, done, id } = req.body;

    try {
      const newTodo = new Todo({
        title,
        done,
        id
      });

      const todo = await newTodo.save();
      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put("/:id", async (req, res) => {
  const { title, done } = req.body;
  //Build contact object
  const contactFields = {};

  if (title) contactFields.title = title;
  if (done) contactFields.done = done;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: "Todo item not found" });

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/todo/:id
// @desc Delete Todo item
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: "Todo item not found" });

    await Todo.findByIdAndRemove(req.params.id);

    res.json({ msg: "Todo item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
