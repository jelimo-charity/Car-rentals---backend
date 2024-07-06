import { eq } from 'drizzle-orm';
import { Vehicles, TIVehicle, TSVehicle, TSVehicleSpecification, TIVehicleSpecification, VehicleSpecifications } from '../drizzle/schema';
import { db } from '../drizzle/db';

// Get all vehicles
export const getVehiclesSpecificationService = async (): Promise<TSVehicle[] | null> => {
  const vehiclesData = await db.select().from(Vehicles).execute();
  return vehiclesData;
};

// Get a specific vehicle specification by ID
export const getVehicleSpecificationService = async (id: number): Promise<TSVehicleSpecification | undefined> => {
  const vehicleSpecificationData = await db.select().from(VehicleSpecifications).where(eq(VehicleSpecifications.id, id)).execute();
  if (vehicleSpecificationData.length === 0) {
    return undefined;
  }
  return vehicleSpecificationData[0];
};

// Create a new vehicle specification
export const createVehicleSpecificationService = async (specification: TIVehicleSpecification) => {
  await db.insert(VehicleSpecifications).values(specification).execute();
  return "Vehicle specification created successfully";
};

// Update a vehicle specification by ID
export const updateVehicleSpecificationService = async (id: number, specification: TIVehicleSpecification) => {
  await db.update(VehicleSpecifications).set(specification).where(eq(VehicleSpecifications.id, id)).execute();
  return "Vehicle specification updated successfully";
};

// Delete a vehicle specification by ID
export const deleteVehicleSpecificationService = async (id: number) => {
  await db.delete(VehicleSpecifications).where(eq(VehicleSpecifications.id, id)).execute();
  return "Vehicle specification deleted successfully";
};
