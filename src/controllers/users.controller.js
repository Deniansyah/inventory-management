const filter = require("../helpers/filter");
const response = require("../helpers/response");
const {
  selectAllUser,
  insertUser,
  selectUser,
  dropUser,
  changeUser,
  selectCountAllUser,
  changePicture,
} = require("../models/users.model");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../helpers/env")
const { cloudinary } = require("../middlewares/upload");


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
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    picture: req.body.picture,
  };

  try {
    insertUser(payload, (error, data) => {
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
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    picture: req.body.picture,
  };

  try {
    changeUser(req.params.id, payload, (error, data) => {
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

exports.uploadUserPicture = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, JWT_SECRET);
  try {
    selectUser(id, (error, results) => {
      const data = results.rows[0];

      if (data.picture) {
        const fileName = data?.picture?.split("/").pop()?.split(".")[0];
        cloudinary.uploader.destroy(`upload/${fileName}`);
      }

      const payload = {
        picture: req.file.path,
      };

      changePicture(id, payload, (error, data) => {
        return res.status(200).json({
          success: true,
          message: "Profile picture successfully updated",
        });
      })
    })
  } catch (error) {
    return response(res, 500);
  }
}
