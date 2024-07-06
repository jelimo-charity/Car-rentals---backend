import { db } from './../drizzle/db';
import { eq } from 'drizzle-orm';
import {   Bookings, TIBooking, TSBooking } from '../drizzle/schema';

export const getBookingsService = async(): Promise<TSBooking[] | null> => {
  const BookingsData = await db.select().from(Bookings);
  return BookingsData
   
}

export const getBookingService = async (id: number): Promise<TSBooking | undefined> => {
    const BookingData = await db.select().from(Bookings).where(eq(Bookings.id, id)).execute();
    if (BookingData.length === 0) {
        return undefined;
    }
    return BookingData[0];
};

export const createBookingService = async (book: TIBooking) => {
    await db.insert(Bookings).values(book).execute();
    return "Book created successfully";
};


export const updateBookingService = async (id: number, book: TIBooking) => {
    await db.update(Bookings).set(book).where(eq(Bookings.id, id)).execute();
    return "Bookings updated successfully";
};


export const deleteBookingService = async (id: number) => {
    await db.delete(Bookings).where(eq(Bookings.id, id)).execute();
    return "Bookings deleted successfully";
};




