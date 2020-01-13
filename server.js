const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Cloud DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => {
//   res.json({
//     msg: "API server dead end"
//   });
// });

//Define Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/todos", require("./routes/toDos"));
app.use("/api/users", require("./routes/users"));

if (process.env.NODE_ENV === "production") {
  //Set static folder
  //app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.json({
      msg: "API server dead end"
    });
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
