const response = require("../helpers/response");
const {
  selectAllProduct,
  insertProduct,
  selectProduct,
  dropProduct,
  changeProduct,
  selectCountAllProduct,
} = require("../models/product.model");
const filter = require("../helpers/filter")

exports.readAllProduct = (req, res) => {
  try {
    const searchable = ["fullname", "email", "createdAt", "updatedAt"];
    const sortable = ["fullname", "email", "createdAt", "updatedAt"];

    filter(req.query, searchable, sortable, selectCountAllProduct, res, (filter, pageInfo) => {
      try {
        selectAllProduct(filter, (error, data) => {
          return res.status(200).json({
            success: true,
            message: "Product Data List",
            pageInfo,
            results: data.rows,
          });
        });
      } catch (error) {
        return response(res, 500);
      }
    })
  } catch (error) {
    return response(res, 500);
  }
};

exports.createProduct = (req, res) => {
  try {
    const stock = req.body.stock ? req.body.stock : 0;
    const payload = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: stock,
    };

    insertProduct(payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Product created success",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateProduct = (req, res) => {
  try {
    changeProduct(req.params.id, req.body, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Updated detail product",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.deleteProduct = (req, res) => {
  try {
    dropProduct(req.params.id, (error, data) => {
      res.status(200).json({
        status: true,
        message: "Delete data product id = " + req.params.id + " success",
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.readProduct = (req, res) => {
  try {
    selectProduct(req.params.id, (error, data) => {
      res.status(200).json({
        status: true,
        message: "Detail product",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.uploadProduct = (req, res) => {
  if (req.file) {
    res.status(200).json({
      status: true,
      message: "Upload success",
    });
  } else {
    res.status(401).json({
      status: false,
      message: "Upload photo failed!",
    });
  }
};
