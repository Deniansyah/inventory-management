const db = require("../helpers/db");

exports.selectAllStock = (cb) => {
  db.query('SELECT * FROM "stock"', cb);
};

exports.insertStock = (data, cb) => {
  db.query(
    'INSERT INTO "stock" ("product_id", "users_id", "date", "type") VALUES ($1, $2, $3, $4) RETURNING *',
    [data.product_id, data.users_id, data.date, data.type],
    cb
  );
};

exports.changeStock = (id, data, cb) => {
  db.query(
    'UPDATE stock SET "product_id" = COALESCE(NULLIF($2, \'\')::INT, "product_id"), "users_id" = COALESCE(NULLIF($3, \'\')::INT, "users_id"), "date" = COALESCE(NULLIF($4, \'\')::TIMESTAMPTZ, "date"), "type" = COALESCE(NULLIF($5, \'\')::INT, "type") WHERE id = $1 RETURNING *',
    [id, data.product_id, data.users_id, data.date, data.type],
    cb
  );
};

exports.dropStock = (id, cb) => {
  db.query('DELETE FROM "stock" WHERE id = $1', [id], cb);
};

exports.selectStock = (id, cb) => {
  db.query('SELECT * FROM "stock" WHERE id = $1', [id], cb);
};
