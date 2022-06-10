import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.on("error", (err, client) => {
  console.error("⚠ Could not connect to database! ", err);
});

export default db;
