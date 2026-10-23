import "dotenv/config";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pool } from "./pool";

async function migrate(): Promise<void> {
  const compiledSchema = resolve(__dirname, "schema.sql");
  const sourceSchema = resolve(process.cwd(), "src/db/schema.sql");
  let schemaPath = compiledSchema;
  try {
    await access(compiledSchema);
  } catch {
    schemaPath = sourceSchema;
  }
  const schema = await readFile(schemaPath, "utf8");
  await pool.query(schema);
  console.log("Database schema is up to date.");
}

migrate()
  .catch((error: unknown) => {
    console.error("Database migration failed:", error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
