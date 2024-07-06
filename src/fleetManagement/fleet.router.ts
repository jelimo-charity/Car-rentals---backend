import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createFleetManagement, deleteFleetManagement, getFleetManagement, getFleetManagements, updateFleetManagement } from "./fleet.controller";
import { FleetManagementSchema } from "../validators";

// Initialize the Hono router for FleetManagements
export const FleetManagementRouter = new Hono();

// Define routes and attach respective controller functions
FleetManagementRouter.get('/FleetManagements', getFleetManagements);
FleetManagementRouter.get('/FleetManagements/:id', getFleetManagement);
FleetManagementRouter.post('/FleetManagements', zValidator("json", FleetManagementSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createFleetManagement);
FleetManagementRouter.put('/FleetManagements/:id', zValidator("json", FleetManagementSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), updateFleetManagement);
FleetManagementRouter.delete('/FleetManagements/:id', deleteFleetManagement);
