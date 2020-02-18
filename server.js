const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

const app = express();

//Connect Cloud DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    msg: "API server dead end"
  });
});

//Define Routes
app.use(helmet());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/todos", require("./routes/toDos"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));

// app.use(
//   mongoSanitize({
//     replaceWith: "_"
//   })
// );
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
