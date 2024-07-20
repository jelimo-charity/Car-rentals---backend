import { Context } from "hono";
import {  createBookingService, deleteBookingService, getBookingService, getBookingsService, updateBookingService,   getBookingVehicleService, getUserWithBookingDetailsById } from "./bookings.service";
import { exceptAll } from "drizzle-orm/mysql-core";


export const getBookings = async(c: Context) => {
    try {
        const data = await getBookingsService();
        if(!data || data.length === 0) { 
            return c.text("Booking not found")
        }
        return c.json(data, 200)
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}


export const getBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Booking = await getBookingService(id);
    if (!Booking) {
        return c.text("Booking not found", 404);
    }
    return c.json(Booking, 200);
};


export const createBooking = async (c: Context) => {
    try {
        const booking = await c.req.json();

        // Convert date strings to Date objects
        if (booking.booking_date) {
            booking.booking_date = new Date(booking.booking_date);
        }
        if (booking.return_date) {
            booking.return_date = new Date(booking.return_date);
        }

        const createdBooking = await createBookingService(booking);

        if (!createdBooking) {
            return c.text("Booking not created", 404);
        }

        return c.json({ id: createdBooking.id, msg: 'Booking created successfully' }, 201); 
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Booking = await c.req.json();
    try {
        // Search for the Booking
        const searchedBooking = await getBookingService(id);
        if (searchedBooking == undefined) return c.text("Booking not found", 404);

        // Get the data and update it
        const res = await updateBookingService(id, Booking);
        // Return a success message
        if (!res) return c.text("Booking not updated", 404);

        return c.json({ msg: res }, 201);
       } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}


export const deleteBooking = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getBookingService(id);
        if (!book) return c.text("Booking not found", 404);
        const res = await deleteBookingService(id);
        if (!res) return c.text("Booking not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// //booking and users
// export const getBookingsByid = async (c:Context) =>{
//     try {
//         const id = parseInt(c.req.param('id'));
//         if(isNaN(id)) return c.text("Invalid ID", 400);
 
//         const bookings = await getBookingsByidService(id);
//         if(!bookings){
//             return c.json({message: 'Booking not found'}, 404);
//         }
//         return c.json(bookings, 200);
//     } catch (error: any) {
//         return c.json({error: error.message}, 400);
//     }
 
// }

// //booked vehicles
// export const getBookedVehicles = async (c:Context) =>{
//     try {
//         const id = parseInt(c.req.param('id'));
//         if(isNaN(id)) return c.text("Invalid ID", 400);
 
//         const bookings = await getBookedVehiclesService(id);
//         if(!bookings){
//             return c.json({message: 'Booking not found'}, 404);
//         }
//         return c.json(bookings, 200);
//     } catch (error: any) {
//         return c.json({error: error.message}, 400);
//     }
 
// }


export const getBookingVehicles = async(c:Context) => {
 
    const bookedVehiclesInfo = await getBookingVehicleService();
    if (bookedVehiclesInfo == undefined) {
        return c.text("restaurantsInfo not found", 404);
    }
    return c.json(bookedVehiclesInfo, 200);
  }

  export const getBookingsWithIdController = async  (c: Context) =>{
    const id = parseInt(c.req.param('id'), 10);
 
    if(isNaN(id)){
        return c.json({error: 'Invalid user ID'}, 400)
    }
 
    try {
        const bookings = await getUserWithBookingDetailsById(id);
        return c.json(bookings, 200);
    } catch (error: any) {
      return c.json({error: error.message}, 500)  
    }
}