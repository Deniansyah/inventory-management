const productRouter = require("express").Router();
const {
  readAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  readProduct,
  uploadProduct
} = require("../controllers/product.controller");
const { auth, isOperator } = require("../middlewares/auth");
const multer = require("multer")

const upload = multer ({
  dest: "upload/"
})

productRouter.patch("/product/upload", auth, isOperator, upload.single("picture"), uploadProduct);

productRouter.get("/product", auth, isOperator, readAllProduct);
productRouter.post("/product", auth, isOperator, createProduct);
productRouter.patch("/product/:id", auth, isOperator, updateProduct);
productRouter.delete("/product/:id", auth, isOperator, deleteProduct);
productRouter.get("/product/:id", auth, isOperator, readProduct);

module.exports = productRouter;
