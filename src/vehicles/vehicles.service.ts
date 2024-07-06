import { db } from './../drizzle/db';
import { eq } from 'drizzle-orm';
import {   Vehicles, TIVehicle, TSVehicle } from '../drizzle/schema';

export const getVehiclesService = async(): Promise<TSVehicle[] | null> => {
  const VehiclesData = await db.select().from(Vehicles);
  return VehiclesData
   
}

export const getVehicleService = async (id: number): Promise<TSVehicle | undefined> => {
    const VehicleData = await db.select().from(Vehicles).where(eq(Vehicles.id, id)).execute();
    if (VehicleData.length === 0) {
        return undefined;
    }
    return VehicleData[0];
};

export const createVehicleService = async (book: TIVehicle) => {
    await db.insert(Vehicles).values(book).execute();
    return "Book created successfully";
};


export const updateVehicleService = async (id: number, book: TIVehicle) => {
    await db.update(Vehicles).set(book).where(eq(Vehicles.id, id)).execute();
    return "Vehicles updated successfully";
};


export const deleteVehicleService = async (id: number) => {
    await db.delete(Vehicles).where(eq(Vehicles.id, id)).execute();
    return "Vehicles deleted successfully";
};




