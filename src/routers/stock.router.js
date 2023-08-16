const stockRouter = require("express").Router();
const {
  readAllStock,
  createStock,
  updateStock,
  deleteStock,
  readStock,
  updateEditStock,
} = require("../controllers/stock.controller");
const { auth, isOperator } = require("../middlewares/auth");

stockRouter.get("/stock", auth, isOperator, readAllStock);
stockRouter.post("/stock", auth, isOperator, createStock);
stockRouter.patch("/stock/:id", auth, isOperator, updateStock);
stockRouter.delete("/stock/:id", auth, isOperator, deleteStock);
stockRouter.get("/stock/:id", auth, isOperator, readStock);
stockRouter.patch("/edit-stock/:id", auth, isOperator, updateEditStock)

module.exports = stockRouter;
