const response = require("../helpers/response");
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
