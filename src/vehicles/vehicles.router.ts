import { Hono } from 'hono';
import { createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from './vehicles.controller';

export const vehiclesRouter = new Hono();

vehiclesRouter.get('/vehicles', getVehicles);             // Get all vehicles
vehiclesRouter.get('/vehicles/:id', getVehicle);          // Get a single vehicle by id
vehiclesRouter.post('/vehicles', createVehicle);          // Create a new vehicle
vehiclesRouter.put('/vehicles/:id', updateVehicle);       // Update a vehicle
vehiclesRouter.delete('/vehicles/:id', deleteVehicle);    // Delete a vehicle
