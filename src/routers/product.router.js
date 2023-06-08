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
const {
  upload: uploadMiddleware,
  uploadErrorHandler,
} = require("../middlewares/upload")

const upload = uploadMiddleware.single("picture")

productRouter.post("/product/upload", auth, isOperator, upload, uploadErrorHandler, uploadProduct);

productRouter.get("/product", auth, isOperator, readAllProduct);
productRouter.post("/product", auth, isOperator, createProduct);
productRouter.patch("/product/:id", auth, isOperator, updateProduct);
productRouter.delete("/product/:id", auth, isOperator, deleteProduct);
productRouter.get("/product/:id", auth, isOperator, readProduct);

module.exports = productRouter;
