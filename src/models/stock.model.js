const db = require("../helpers/db");

exports.selectAllStock = (filter, cb) => {
  db.query(
    `SELECT "s"."id" AS "stock_id", "p"."name" AS "product_name", "u"."name" AS "user_name", "s"."quantity", "s"."date", "s"."type", "s"."remark", "s"."createdAt", "s"."updatedAt" FROM "stock" "s" LEFT JOIN "product" "p" ON "s"."product_id" = "p"."id" LEFT JOIN "users" "u" ON "s"."users_id" = "u"."id" WHERE ${filter.cInitCol}.${filter.searchBy} ILIKE $3 AND ($4::INT IS NULL OR "s"."type" = $4::INT) ORDER BY ${filter.cInitSort}."${filter.sortStockBy}" ${filter.sort} LIMIT $1 OFFSET $2`,
    [filter.limit, filter.offset, `%${filter.search}%`, filter.type],
    cb
  );
};

exports.selectCountAllStock = (filter, cb) => {
  db.query(
    `SELECT COUNT(${filter.cInitCol}.${filter.searchBy}) AS "totalData" FROM "stock" "s" LEFT JOIN "product" "p" ON "s"."product_id" = "p"."id" LEFT JOIN "users" "u" ON "s"."users_id" = "u"."id" WHERE ${filter.cInitCol}.${filter.searchBy} ILIKE $1 AND ($2::INT IS NULL OR "s"."type" = $2::INT)`,
    [`%${filter.search}%`, filter.type],
    cb
  );
}

exports.insertStock = (data, cb) => {
  db.query(
    'INSERT INTO "stock" ("product_id", "users_id", "quantity", "date", "type", "remark") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [data.product_id, data.users_id, data.quantity, data.date, data.type, data.remark],
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
