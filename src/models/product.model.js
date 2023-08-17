const db = require("../helpers/db");

exports.selectAllProduct = (filter, cb) => {
  db.query(
    `SELECT * FROM "product" WHERE ${filter.searchBy} ILIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort}  LIMIT $1 OFFSET $2`,
    [filter.limit, filter.offset, `%${filter.search}%`],
    cb
  );
};

exports.selectCountAllProduct = (filter, cb) => {
  db.query(
    `SELECT COUNT(${filter.searchBy}) AS "totalData" FROM "product" WHERE ${filter.searchBy} ILIKE $1`,
    [`%${filter.search}%`],
    cb
  );
};

exports.insertProduct = (data, cb) => {
  db.query(
    `INSERT INTO "product" ("picture", "name", "description", "price", "stock") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [data.picture, data.name, data.description, data.price, data.stock],
    cb
  );
};

exports.changeProduct = (id, data, cb) => {
  db.query(
    'UPDATE product SET "name" = COALESCE(NULLIF($2, \'\'), "name"), "price" = COALESCE(NULLIF($3, \'\')::BIGINT, "price"), "description" = COALESCE(NULLIF($4, \'\'), "description"), "picture" = COALESCE(NULLIF($5, \'\'), "picture"), "stock" = COALESCE(NULLIF($6, \'\')::BIGINT, "stock") WHERE id = $1 RETURNING *',
    [id, data.name, data.price, data.description, data.picture, data.stock],
    cb
  );
};

exports.dropProduct = (id, cb) => {
  db.query('DELETE FROM "product" WHERE id = $1', [id], cb);
};

exports.selectProduct = (id, cb) => {
  db.query('SELECT * FROM "product" WHERE id = $1', [id], cb);
};
