import { db } from './../drizzle/db';
import { eq } from 'drizzle-orm';
import { Vehicles, TIVehicle, TSVehicle } from '../drizzle/schema';

export const getVehiclesService = async (): Promise<TSVehicle[] | null> => {
  const vehiclesData = await db.select().from(Vehicles);
  return vehiclesData;
};

export const getVehicleService = async (id: number): Promise<TSVehicle | undefined> => {
  const vehicleData = await db.select().from(Vehicles).where(eq(Vehicles.id, id)).execute();
  if (vehicleData.length === 0) {
    return undefined;
  }
  return vehicleData[0];
};

export const createVehicleService = async (vehicle: TIVehicle) => {
  await db.insert(Vehicles).values(vehicle).execute();
  return "Vehicle created successfully";
};

export const updateVehicleService = async (id: number, vehicle: TIVehicle): Promise<string> => {
  await db.update(Vehicles).set(vehicle).where(eq(Vehicles.id, id)).execute();
  return "Vehicle updated successfully";
};

export const deleteVehicleService = async (id: number) => {
  await db.delete(Vehicles).where(eq(Vehicles.id, id)).execute();
  return "Vehicle deleted successfully";
};

// Additional Service Functions

// Example: Get vehicles by manufacturer
export const getVehiclesByManufacturerService = async (manufacturer: string): Promise<TSVehicle[] | undefined> => {
  return await db.select().from(Vehicles).where(eq(Vehicles.manufacturer, manufacturer)).execute();
};
