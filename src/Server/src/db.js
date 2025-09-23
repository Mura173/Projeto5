import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const isRender = process.env.PG_HOST?.includes("render.com");

export const pool = new Pool({
  host: process.env.PG_HOST,
  user: String(process.env.PG_USER),
  password: String(process.env.PG_PASSWORD),
  database: String(process.env.PG_DB),
  port: Number(process.env.PG_PORT),
  ssl: isRender ? { rejectUnauthorized: false } : false,
});
