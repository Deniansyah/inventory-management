require("dotenv").config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_SUPABASE = process.env.DB_SUPABASE;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME; 
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

module.exports = {
  PORT,
  DB_URL,
  DB_SUPABASE,
  JWT_SECRET,
  CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
};
