import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createLocation, deleteLocation, getLocation, getLocations, updateLocation } from "./location.controller";
import { LocationSchema } from "../validators";

// Initialize the Hono router for locations
export const LocationRouter = new Hono();

// Define routes and attach respective controller functions
LocationRouter.get('/locations', getLocations);
LocationRouter.get('/locations/:id', getLocation);
LocationRouter.post('/locations', zValidator("json", LocationSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createLocation);
LocationRouter.put('/locations/:id', zValidator("json", LocationSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), updateLocation);
LocationRouter.delete('/locations/:id', deleteLocation);
