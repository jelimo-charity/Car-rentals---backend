
import { eq } from 'drizzle-orm';
import { TIVehicle, TSVehicle, Vehicles } from '../drizzle/schema';
import { db } from '../drizzle/db';

// Get all Vehicles
export const VehiclesService = async (limit?: number): Promise<TSVehicle[] | null> => {
    if (limit) {
        return await db.select().from(Vehicles).limit(limit).execute();
    }
    return await db.select().from(Vehicles).execute();
}

// Get a single Vehicle by id
export const getVehicleService = async (id: number): Promise<TSVehicle | undefined> => {
    const VehicleArray = await db.select().from(Vehicles).where(eq(Vehicles.id, id)).execute();

    if (VehicleArray.length === 0) {
        return undefined;
    }

    return VehicleArray[0];
}

// Create a new Vehicle
export const createVehicleService = async (Vehicle: TIVehicle) => {
    await db.insert(Vehicles).values(Vehicle).execute();
    return "Vehicle created successfully";
}

// Update a Vehicle
export const updateVehicleService = async (id: number, Vehicle: TIVehicle) => {
    await db.update(Vehicles).set(Vehicle).where(eq(Vehicles.id, id)).execute();
    return "Vehicle updated successfully";
}

// Delete a Vehicle
export const deleteVehicleService = async (id: number) => {
    await db.delete(Vehicles).where(eq(Vehicles.id, id)).execute();
    return "Vehicle deleted successfully";
}
