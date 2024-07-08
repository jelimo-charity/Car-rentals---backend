import { uploadMiddleware } from './../middlewares/uploadMiddleware';
import { Context, Hono } from 'hono';
import { createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from './vehicles.controller';
import { zValidator } from '@hono/zod-validator';
import { VehicleSchema } from '../validators';

export const VehicleRouter = new Hono();

VehicleRouter.get('/vehicles', getVehicles);
VehicleRouter.get('/vehicles/:id', getVehicle);
VehicleRouter.post('/vehicles', uploadMiddleware, zValidator('json', VehicleSchema, (result: any, c: Context) => {
  if (!result.success) {
    return c.json(result.error, 400);
  }
}), createVehicle);
VehicleRouter.put('/vehicles/:id', uploadMiddleware, updateVehicle);
VehicleRouter.delete('/vehicles/:id', deleteVehicle);
