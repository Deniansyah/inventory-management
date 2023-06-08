const { Pool } = require("pg");
const { DB_URL } = require("./env")

const db = new Pool({ connectionString: DB_URL });

module.exports = db;
