import { Context, Hono } from "hono";
import { createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from "./vehicles.controller";
import { zValidator } from "@hono/zod-validator";
import { VehicleSchema } from "../validators";


export const VehicleRouter = new Hono();

VehicleRouter.get('/Vehicles', getVehicles)
VehicleRouter.get('/Vehicles/:id', getVehicle )
VehicleRouter.post("/Vehicles", zValidator("json", VehicleSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createVehicle);
VehicleRouter.put('/Vehicles/:id', updateVehicle)
VehicleRouter.delete("/Vehicles/:id", deleteVehicle)