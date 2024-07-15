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


export const updateBookingService = async (id: number, book: TIBooking) :Promise<string>=> {
    await db.update(Bookings).set(book).where(eq(Bookings.id, id)).execute();
    return "Bookings updated successfully";
};


export const deleteBookingService = async (id: number) => {
    await db.delete(Bookings).where(eq(Bookings.id, id)).execute();
    return "Bookings deleted successfully";
};


//relations
export const getBookingsByUserIdService = async (id: number): Promise<TSBooking[] | undefined> => {
    return await db.query.Bookings.findMany({
        where: eq(Bookings.user_id, id),
    });
}

// bookings and vehicles
export const getBookedVehiclesService = async (id: number): Promise<TSBooking[] | undefined> => {
    return await db.query.Bookings.findMany({
        where: eq(Bookings.vehicle_id, id),
    });
}

export const getBookingVehicleService = async () => {
    return await db.query.Bookings.findMany({
      columns: {
        id:true,
        booking_date: true,
        return_date: true,
        total_amount: true,
        booking_status: true,
        vehicle_id: true
      },
      with: {
        vehicle: {
          columns: {
            rental_price: true,
            availability: true,
            image_url: true,
            created_at: true,
            updated_at: true,
            
        },
        
      },
      payment: {
        columns: {
            amount: true,
            payment_status: true,
            transaction_id: true
        }
      },
      location: {
        columns: {
            name: true,
            address: true,
            contact_phone: true
        }
      }
    },
    
});
  }