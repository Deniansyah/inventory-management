const db = require("../helpers/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.selectAllUser = (filter, cb) => {
  db.query(
    `SELECT * FROM "users" WHERE ${filter.searchBy} LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $1 OFFSET $2`,
    [filter.limit, filter.offset, `%${filter.search}%`],
    cb
  );
};

exports.selectCountAllUser = (filter, cb) => {
  db.query(`SELECT COUNT("name") AS "totalData" FROM "users"`, cb);
};

exports.insertUser = (data, cb) => {
  const hashedPassword = bcrypt.hashSync(data.password, saltRounds);
  db.query(
    'INSERT INTO "users" ("name", "email", "password", "role", "picture") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [data.name, data.email, hashedPassword, data.role, data.picture],
    cb
  );
};

exports.changeUser = (id, data, cb) => {
  const hashedPassword = bcrypt.hashSync(data.password, saltRounds)
  db.query(
    'UPDATE users SET "name" = COALESCE(NULLIF($2, \'\'), "name"), "email" = COALESCE(NULLIF($3, \'\'), "email"), "password" = COALESCE(NULLIF($4, \'\'), "password"), "role" = COALESCE(NULLIF($5, \'\')::INT, "role"), "picture" = COALESCE(NULLIF($6, \'\'), "picture") WHERE id = $1 RETURNING *',
    [id, data.name, data.email, hashedPassword, data.role, data.picture],
    cb
  );
};

exports.changePicture = (id, data, cb) => {
  db.query(
    'UPDATE users SET "picture" = COALESCE(NULLIF($2, \'\'), "picture") WHERE id = $1 RETURNING *',
    [id, data.picture],
    cb
  );
};

exports.dropUser = (id, cb) => {
  db.query('DELETE FROM "users" WHERE id = $1', [id], cb);
};

exports.selectUser = (id, cb) => {
  db.query('SELECT * FROM "users" WHERE id = $1', [id], cb);
};
