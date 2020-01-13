const express = require("express");
const router = express.Router();

//@route GET api/auth
//@desc Get all toDos
//@access Public

router.get("/", (req, res) => {
  res.send("Get all toDos");
});

//@route POST api/auth
//@desc Create new ToDo
//@access Public

router.post("/", (req, res) => {
  res.send("New ToDo created");
});

router.put("/:id", (req, res) => {
  res.send("Update toDo");
});

//@route DELETE api/contacts/:id
//@desc Delete contact
//@access Private

router.delete("/:id", (req, res) => {
  res.send("Delete ToDo");
});

module.exports = router;
