const db = require("../helpers/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;


exports.selectAllUser = (cb) => {
  db.query('SELECT * FROM "users"', cb);
};

exports.insertUser = (data, cb) => {
  const hashedPassword = bcrypt.hashSync(data.password, saltRounds)
  db.query(
    'INSERT INTO "users" ("fullname", "email", "password", "role") VALUES ($1, $2, $3, $4) RETURNING *',
    [
      data.fullname,
      data.email,
      hashedPassword,
      data.role,
    ],
    cb
  );
};

exports.changeUser = (id, data, cb) => {
  const hashedPassword = bcrypt.hashSync(data.password, saltRounds);
  db.query(
    'UPDATE users SET "fullname" = COALESCE(NULLIF($2, \'\'), "fullname"), "email" = COALESCE(NULLIF($3, \'\'), "email"), "password" = COALESCE(NULLIF($4, \'\'), "password"), "role" = COALESCE(NULLIF($5, \'\')::INT, "role") WHERE id = $1 RETURNING *',
    [id, data.fullname, data.email, hashedPassword, data.role],
    cb
  );
};

exports.dropUser = (id, cb) => {
  db.query('DELETE FROM "users" WHERE id = $1', [id], cb);
};

exports.selectUser = (id, cb) => {
  db.query('SELECT * FROM "users" WHERE id = $1', [id], cb);
};