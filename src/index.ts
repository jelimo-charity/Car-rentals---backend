import {  paymentsRouter } from './payment/payment.router';
import { Hono } from "hono";
import "dotenv/config";
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { BookingRouter } from "./bookings/bookings.router";
import { LocationRouter } from "./location/location.router";
import { FleetManagementRouter } from "./fleetManagement/fleet.router";
import { CustomerSupportTicketRouter } from "./customerSupport/customerSupport.router";
import { authRouter } from "./drizzle/auth/auth.router";
import { usersRouter } from "./users/users.router";
import { vehiclesRouter } from "./vehicles/vehicles.router";
const app = new Hono();

app.use('/*', cors());


app.get("/", async (c) => {
   c.text("Hello World");
});
 app.route('/', vehiclesRouter)
 app.route('/', BookingRouter) 
 app.route('/', LocationRouter) 
 app.route("/",FleetManagementRouter)
 app.route("/", CustomerSupportTicketRouter)
 app.route("/", paymentsRouter)
 app.route("/", usersRouter)
 app.route("/", authRouter)


 


serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});

console.log(`Server is running on http://localhost:${process.env.PORT}`);
