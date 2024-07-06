import "dotenv/config"
import {defineConfig} from "drizzle-kit"

export default defineConfig ({
    schema: "./src/drizzle/schema.ts",
    dialect: "postgresql",
    out: "./src/drizzle/migrations",
    dbCredentials: {
        url: process.env.DB_URL as string,
    },
    verbose: true,
    strict:true,
    
})