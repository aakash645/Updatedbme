import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function migrate() {
  const migrationSQL = fs.readFileSync(
    path.join(process.cwd(), "migrations/0001_add_admin_features.sql"),
    "utf-8"
  );

  const statements = migrationSQL
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  console.log(`Running ${statements.length} migration statements...`);

  for (const statement of statements) {
    try {
      await sql(statement);
      console.log("✅", statement.slice(0, 60) + "...");
    } catch (err: any) {
      if (err.message?.includes("already exists") || err.message?.includes("does not exist")) {
        console.log("⏭️  Skipped (already applied):", statement.slice(0, 60));
      } else {
        console.error("❌ Error:", err.message);
        console.error("Statement:", statement);
      }
    }
  }

  console.log("\n🎉 Migration complete!");
}

migrate().catch(console.error);
