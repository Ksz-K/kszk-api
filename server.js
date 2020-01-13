const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    names: [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false
      }
    ]
  });
});

//Define Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/todos", require("./routes/toDos"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
