import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
  ssl: process.env.PG_HOST?.includes("render.com")
    ? { rejectUnauthorized: false } // necessário no Render
    : false,
});
