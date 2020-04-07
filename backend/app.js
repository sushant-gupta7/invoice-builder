const express = require("express");
const mongoose = require("mongoose");
const { setGlobalMiddleware } = require("./api/middleware/global-middleware");
const routes = require("../backend/api/index.route");

// mongoose.Promise = global.Promise;
const DATABASE =
  process.env.MONGO_URI ||
  "mongodb+srv://Sushant-gupta7:sushant7@cluster0-hv5jx.mongodb.net/test";
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Mongo DB Connected"))
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;
const app = express();
setGlobalMiddleware(app);
app.use("/api", routes);
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.message = "Invalid aRoute";
  error.status = "404";
  next(error);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("new-message", (message) => {
    io.emit("emit-message", message);
  });
});
