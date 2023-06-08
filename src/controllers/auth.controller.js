const response = require("../helpers/response");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helpers/env");
const { selectUserByEmail } = require("../models/auth.model");
const bcrypt = require("bcrypt");


module.exports = {
  login: (req, res) => {
    try {
      selectUserByEmail(req.body.email, async (error, { rows }) => {
        if (rows.length) {
          const [users] = rows;
          if (await bcrypt.compare(req.body.password, users.password)) {
            const token = jwt.sign(
              { id: users.id, email: users.email, role: users.role },
              JWT_SECRET
            );
            return response(res, 200, {
              data: token,
              message: "Login success",
            });
          }
        } else {
          return response(res, 404, { message: "Email or Password wrong" });
        }
      });
    } catch (error) {
      return response(res, 500);
    }
  },
};
