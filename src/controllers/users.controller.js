const filter = require("../helpers/filter");
const response = require("../helpers/response");
const {
  selectAllUser,
  insertUser,
  selectUser,
  dropUser,
  changeUser,
  selectCountAllUser,
} = require("../models/users.model");


exports.readAllUser = (req, res) => {
  try {
    const searchable = ["name", "email", "createdAt", "updatedAt"];
    const sortable = ['name', 'email', 'createdAt', 'updatedAt']

    filter(req.query, searchable, sortable, selectCountAllUser, res, (filter, pageInfo) => {
      try {
        selectAllUser(filter, (error, data) => {  
          return res.status(200).json({
            success : true,
            message : "Lists all casts",
            pageInfo,
            results : data.rows
          })
        })
      } catch (error) {
        return response(res, 500);
      }
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
