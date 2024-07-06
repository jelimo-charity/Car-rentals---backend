import { Context, Hono } from "hono";
import { 
    createBooking, 
    deleteBooking, 
    getBooking, 
    getBookings, 
    updateBooking 
} from "./bookings.controller";
import { zValidator } from "@hono/zod-validator";
import { BookingSchema } from "../validators";

// Initialize the Hono router for bookings
export const BookingRouter = new Hono();

// Define routes and attach respective controller functions
BookingRouter.get('/bookings', getBookings);
BookingRouter.get('/bookings/:id', getBooking);
BookingRouter.post('/bookings', zValidator("json", BookingSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createBooking);
BookingRouter.put('/bookings/:id', zValidator("json", BookingSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), updateBooking);
BookingRouter.delete('/bookings/:id', deleteBooking);
