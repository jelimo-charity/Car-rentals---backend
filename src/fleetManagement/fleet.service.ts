import { db } from './../drizzle/db';
import { eq } from 'drizzle-orm';
import {   FleetManagement, TIFleetManagement, TSFleetManagement } from '../drizzle/schema';

export const getFleetManagementsService = async(): Promise<TSFleetManagement[] | null> => {
  const FleetManagementsData = await db.select().from(FleetManagement);
  return FleetManagementsData
   
}

export const getFleetManagementService = async (id: number): Promise<TSFleetManagement | undefined> => {
    const FleetManagementData = await db.select().from(FleetManagement).where(eq(FleetManagement.id, id)).execute();
    if (FleetManagementData.length === 0) {
        return undefined;
    }
    return FleetManagementData[0];
};

export const createFleetManagementService = async (book: TIFleetManagement) => {
    await db.insert(FleetManagement).values(book).execute();
    return "Book created successfully";
};


export const updateFleetManagementService = async (id: number, book: TIFleetManagement) => {
    await db.update(FleetManagement).set(book).where(eq(FleetManagement.id, id)).execute();
    return "FleetManagements updated successfully";
};


export const deleteFleetManagementService = async (id: number) => {
    await db.delete(FleetManagement).where(eq(FleetManagement.id, id)).execute();
    return "FleetManagements deleted successfully";
};




