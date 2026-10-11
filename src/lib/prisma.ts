import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

function resolveDatabaseUrl(): string | undefined {
  if (process.env.VERCEL) {
    try {
      const tmpDb = "/tmp/dev.db";
      const templateDb = path.join(process.cwd(), "prisma", "template.db");
      if (!fs.existsSync(tmpDb) && fs.existsSync(templateDb)) {
        fs.copyFileSync(templateDb, tmpDb);
        console.log("Initialized /tmp/dev.db from template.db for serverless execution");
      }
      return `file:${tmpDb}`;
    } catch (e) {
      console.warn("Could not copy SQLite template to /tmp:", e);
    }
  }
  return process.env.DATABASE_URL;
}

const dbUrl = resolveDatabaseUrl();
if (dbUrl) {
  process.env.DATABASE_URL = dbUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

