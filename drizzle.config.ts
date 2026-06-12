import { defineConfig } from "drizzle-kit";

if (!process.env.BUNNY_DATABASE_URL) {
  throw new Error("BUNNY_DATABASE_URL is not set");
}
if (!process.env.BUNNY_DATABASE_AUTH_TOKEN) {
  throw new Error("BUNNY_DATABASE_AUTH_TOKEN is not set");
}

export default defineConfig({
  schema: "./auth-schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.BUNNY_DATABASE_URL + "?authToken=" + process.env.BUNNY_DATABASE_AUTH_TOKEN,
  },
});
