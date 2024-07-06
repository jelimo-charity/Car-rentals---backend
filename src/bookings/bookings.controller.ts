import { Context } from "hono";
import {  createBookingService, deleteBookingService, getBookingService, getBookingsService, updateBookingService } from "./bookings.service";


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
        const Booking = await c.req.json();
        const createdBooking = await createBookingService(Booking);
        if (!createdBooking) return c.text("Book not created", 404);
        return c.json({ msg: createdBooking }, 201);
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

