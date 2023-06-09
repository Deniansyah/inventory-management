const express = require("express");
const cors = require("cors");
const { PORT } = require("./src/helpers/env");
const authRouter = require("./src/routers/auth.router");
const usersRouter = require("./src/routers/user.router");
const productRouter = require("./src/routers/product.router");
const stockRouter = require("./src/routers/stock.router");

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  return res.send("<h1>It Works</h1>");
});

app.use(authRouter);
app.use(usersRouter);
app.use(productRouter);
app.use(stockRouter);

const APP_PORT = PORT || 3001;
app.listen(APP_PORT, () => {
  console.log(`service running at PORT ${APP_PORT}`);
});
