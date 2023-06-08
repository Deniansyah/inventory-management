const response = require("../helpers/response");
const {
  selectAllUser,
  insertUser,
  selectUser,
  dropUser,
  changeUser,
} = require("../models/users.model");


exports.readAllUser = (req, res) => {
  try {
    selectAllUser((error, data) => {
      return res.status(200).json({
        success: true,
        message: "Users Data List",
        results: data.rows,
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.createUser = (req, res) => {
  try {
    insertUser(req.body, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "User created success",
        results: data.rows[0],
      });
    })
  } catch (error) {
    return response(res, 500);
  }
};

exports.updateUser = (req, res) => {
  try {
    changeUser(req.params.id, req.body, (error, data) => {
      return res.status(200).json({
        status: true,
        message: "Updated detail user",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.deleteUser = (req, res) => {
  try {
    dropUser(req.params.id, (error, data) => {
      res.status(200).json({
        status: true,
        message: "Delete data user id = " + req.params.id + " success",
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};

exports.readUser = (req, res) => {
  try {
    selectUser(req.params.id, (error, data) => {
      res.status(200).json({
        status: true,
        message: "Detail User",
        results: data.rows[0],
      });
    });
  } catch (error) {
    return response(res, 500);
  }
};
