import { pool } from "./db.js";

(async () => {
  try {
    const res = await pool.query("SELECT 1");
    console.log("✅ Conexão OK", res.rows);
  } catch (err) {
    console.error("❌ Erro na conexão:", err);
  } finally {
    pool.end();
  }
})();
