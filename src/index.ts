import { Hono } from "hono";
import "dotenv/config";
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { VehicleRouter } from "./vehicles/vehicles.router";
import { VehicleSpecificationRouter } from "./vehicleSpecification/vehicleSpecification.router";
import { BookingRouter } from "./bookings/bookings.router";
import { LocationRouter } from "./location/location.router";
import { FleetManagementRouter } from "./fleetManagement/fleet.router";
import { CustomerSupportTicketRouter } from "./customerSupport/customerSupport.router";

const app = new Hono();

app.use('/*', cors());

app.get("/", async (c) => {
   c.text("Hello World");
});
 app.route('/', VehicleRouter)
 app.route('/', VehicleSpecificationRouter)
 app.route('/', BookingRouter) 
 app.route('/', LocationRouter) 
 app.route("/",FleetManagementRouter)
 app.route("/", CustomerSupportTicketRouter)


 


serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});

console.log(`Server is running on http://localhost:${process.env.PORT}`);
