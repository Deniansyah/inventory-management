const filter = require("../helpers/filter");
const response = require("../helpers/response");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helpers/env");
const { changeProduct, selectProduct } = require("../models/product.model");
const {
  selectAllStock,
  selectCountAllStock,
  insertStock,
  changeStock,
  dropStock,
  selectStock,
} = require("../models/stock.model");

exports.readAllStock = (req, res) => {
  try {
    const searchable = ["name", "remark", "type", "date", "createdAt", "u", "p", "s"];  // change initial coloum ex: p = product, u = users, s = stock
    const sortable = ["name", "remark", "type", "date", "createdAt", "u", "p", "s"];

    filter(req.query, searchable, sortable, selectCountAllStock, res, (filter, pageInfo) => {
      selectAllStock(filter, (error, data) => {
        if (error) {
          return response(res, 404, { message: "Error in model" });
        }

        return res.status(200).json({
          status: true,
          message: "Lists data of stock",
          pageInfo,
          results: data.rows,
        });
      });
    })
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

exports.updateEditStock = async (req, res) => {
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(" ")[1];
  const decode = await jwt.verify(token, JWT_SECRET);
  const id = decode.id
  
  try {
    selectProduct(req.params.id, (error, data) => {
      const payloadStock = {
        product_id: req.params.id,
        users_id: id,
        date: req.body.date,
        type: req.body.type,
        remark: req.body.remark,
        quantity: req.body.quantity,
      };

      const typeInt = parseInt(req.body.type);
      const stockDb = parseInt(data.rows[0].stock);
      const qtyInt = parseInt(req.body.quantity);

      if (typeInt === 2 && qtyInt > stockDb) {
        return response(res, 400, {
          success: false,
          message: "Stock tidak mencukupi untuk di kurangi",
        });
      }

      const stock = stockDb < qtyInt ? stockDb + qtyInt : stockDb - qtyInt;
      const payloadProduct = {
        stock: typeInt === 3 ? qtyInt : stock,
      };

      changeProduct(req.params.id, payloadProduct, (error) => {
        if (error) {
          return response(res, 400, {
            success: false,
            message: "Failed to update product",
          });
        }

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
    })
  } catch (error) {
    return response(res, 400, {
      success: false,
      message: "Failed to check stock product",
    });
  }
}
