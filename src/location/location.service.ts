import { db } from './../drizzle/db';
import { eq } from 'drizzle-orm';
import {   Locations, TILocation, TSLocation } from '../drizzle/schema';

export const getLocationsService = async(): Promise<TSLocation[] | null> => {
  const LocationsData = await db.select().from(Locations);
  return LocationsData
   
}

export const getLocationService = async (id: number): Promise<TSLocation | undefined> => {
    const LocationData = await db.select().from(Locations).where(eq(Locations.id, id)).execute();
    if (LocationData.length === 0) {
        return undefined;
    }
    return LocationData[0];
};

export const createLocationService = async (book: TILocation) => {
    await db.insert(Locations).values(book).execute();
    return "Book created successfully";
};


export const updateLocationService = async (id: number, book: TILocation) => {
    await db.update(Locations).set(book).where(eq(Locations.id, id)).execute();
    return "Locations updated successfully";
};


export const deleteLocationService = async (id: number) => {
    await db.delete(Locations).where(eq(Locations.id, id)).execute();
    return "Locations deleted successfully";
};




