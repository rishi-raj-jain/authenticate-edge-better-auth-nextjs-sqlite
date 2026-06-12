import { db } from "./database";
import * as schema from "./auth-schema";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";

export const auth = betterAuth({
  plugins: [nextCookies()],
  emailAndPassword: { enabled: true },
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
});
