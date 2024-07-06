import { zValidator } from '@hono/zod-validator';
import { Context, Hono } from "hono";
import { 
    createVehicleSpecification, 
    deleteVehicleSpecification, 
    getVehicleSpecification, 
    getVehicleSpecifications, 
    updateVehicleSpecification 
} from "./vehicleSpecification.controller";
import { VehicleSpecificationSchema } from "../validators";

// Initialize the Hono router for vehicle specifications
export const VehicleSpecificationRouter = new Hono();

// Define routes and attach respective controller functions
VehicleSpecificationRouter.get('/vehicle-specifications', getVehicleSpecifications);
VehicleSpecificationRouter.get('/vehicle-specifications/:id', getVehicleSpecification);
VehicleSpecificationRouter.post('/vehicle-specifications', zValidator("json", VehicleSpecificationSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createVehicleSpecification);
VehicleSpecificationRouter.put('/vehicle-specifications/:id', updateVehicleSpecification);
VehicleSpecificationRouter.delete('/vehicle-specifications/:id', deleteVehicleSpecification);
