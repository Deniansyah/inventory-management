const db = require("../helpers/db");

exports.selectAllStock = (cb) => {
  db.query('SELECT s.id AS stock_id, p.name AS product_name, u.name AS user_name, s.quantity, s.date, s.type, s.remark, s."createdAt", s."updatedAt" FROM stock s LEFT JOIN product p ON s.product_id = p.id LEFT JOIN users u ON s.users_id = u.id', cb);
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
