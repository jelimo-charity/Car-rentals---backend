import "dotenv/config";
import {drizzle,NeonHttpDatabase} from 'drizzle-orm/neon-http';
import {neon} from '@neondatabase/serverless';
import * as schema from './schema';
import Stripe from "stripe";

export const databaseUrl = process.env.DB_URL as string;
if(!databaseUrl) throw new Error("DB_URL is not defined");

const sql = neon(databaseUrl);

export const db: NeonHttpDatabase<typeof schema> = drizzle(sql, {schema, logger: true});


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
    typescript: true
})