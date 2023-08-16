const response = require("../helpers/response");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helpers/env");
const { changeProduct } = require("../models/product.model");
const {
  selectAllStock,
  insertStock,
  changeStock,
  dropStock,
  selectStock,
} = require("../models/stock.model");

exports.readAllStock = (req, res) => {
  try {
    selectAllStock((error, data) => {
      return res.status(200).json({
        status: true,
        message: "Lists data of stock",
        results: data.rows,
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.createStock = (req, res) => {
  const payload = {
    product_id: req.body.product_id,
    users_id: req.body.users_id,
    date: req.body.date,
    type: req.body.type,
  };

  try {
    insertStock(payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Stock add successfully",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateStock = (req, res) => {
  const payload = {
    product_id: req.body.product_id,
    users_id: req.body.users_id,
    date: req.body.date,
    type: req.body.type,
  };

  try {
    changeStock(req.params.id, payload, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Updated data stock is success",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateEditStock = (req, res) => {
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return response(res, 400, {
        success: false,
        message: "Token tidak valid",
      });
    }
    const id = decodedToken.id;

    const payloadStock = {
      product_id: req.body.id,
      users_id: id,
      date: req.body.date,
      type: req.body.type,
      remark: req.body.remark,
      quantity: req.body.quantity,
    };

    insertStock(payloadStock, (error, data) => {
      if (error) {
        return response(res, 400, {
          success: false,
          message: "Failed to create stock",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Stock add successfully",
        results: data.rows[0],
      });
    });
  });

  const stock = req.body.stock ? req.body.stock : 0;
  const payloadProduct = {
    stock: stock,
  };

  changeProduct(req.params.id, payloadProduct, (error) => {
    if (error) {
      return response(res, 400, {
        success: false,
        message: "Failed to update product",
      });
    }
  });

};

exports.deleteStock = (req, res) => {
  dropStock(req.params.id, (error) => {
    if (error) {
      return response(res, 500);
    }
    return res.status(200).json({
      status: true,
      message: "Deleted stock id = " + req.params.id + " success",
    });
  });
};

exports.readStock = (req, res) => {
  try {
    selectStock(req.params.id, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Show detail stock",
        results: data.rows[0],
      });
    })
  } catch (error) {
    return response(res, 500);
  }
};
