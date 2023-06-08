require("dotenv").config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  DB_URL,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  JWT_SECRET,
};
