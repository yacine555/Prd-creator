import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

// version drizzlekit < 0.21.0
// export default {
//     driver: "pg",
//     schema: "./src/lib/db/schema.ts",
//     dbCredentials: {
//         connectionString: process.env.DATABASE_URL!,
//   },
// } satisfies Config;

// version drizzlekit > 0.21.0 dot Drizzle studio
export default {
    dialect: "postgresql",
    schema: "./src/lib/db/schema.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
  },
} satisfies Config;

//npx drizzle-kit push  