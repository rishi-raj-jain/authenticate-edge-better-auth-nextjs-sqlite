import { drizzle } from "drizzle-orm/libsql";

if (!process.env.BUNNY_DATABASE_URL) {
  throw new Error("BUNNY_DATABASE_URL is not set");
}
if (!process.env.BUNNY_DATABASE_AUTH_TOKEN) {
  throw new Error("BUNNY_DATABASE_AUTH_TOKEN is not set");
}

export const db = drizzle({
  connection: {
    url: process.env.BUNNY_DATABASE_URL,
    authToken: process.env.BUNNY_DATABASE_AUTH_TOKEN,
  },
});
