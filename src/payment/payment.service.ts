import { eq, and } from "drizzle-orm";
import { TSPayment, TIPayment, Payments, Bookings,  } from "../drizzle/schema";
import { db } from "../drizzle/db";
 
export async function getAllPaymentservice(): Promise<TSPayment[] | null> {
  return await db.query.Payments.findMany();
}
 
export async function getOnePaymentservice(
  id: number
): Promise<TSPayment[] | null> {
  return await db.query.Payments.findMany({ where: eq(Payments.id, id) });
}
 
export async function getUserbooking(id: number) {
  return await db.query.Bookings.findMany({
    where: and(eq(Bookings.user_id, id), eq(Bookings.booking_status, "Pending")),
    with: {
      vehicle: {
        with: {
          vehicleSpecifications: true,
        },
      },
    },
  });
}
 
export async function servePaymentDelete(id: number) {
  return await db
    .delete(Payments)
    .where(eq(Payments.id, id))
    .returning({ paymentId: Payments.id });
}
 
export async function createPaymentservice(paymentDetail: any) {
  return await db.insert(Payments).values(paymentDetail).returning({
    id: Payments.id,
  });
}
 
// has context menu

// import { db } from "../drizzle/db";
// import {  Payments, TIPayment } from "../drizzle/schema";
// import { eq } from "drizzle-orm";
// import "dotenv/config";
// import { stripe } from "../drizzle/db";

// export const createPaymentservice = async (payment: TIPayment) => {
//     if (payment.booking_id === undefined) {
//         throw new Error("Booking ID is required");
//     }
    
//     // Create a payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: Number(payment.amount) * 100,
//         currency: 'usd',
//         metadata: { booking_id: payment.booking_id },
//     });

//     // Save payment details to the database
//     await db.insert(Payments).values({
//         booking_id: payment.booking_id,
//         amount: payment.amount,
//         payment_status: 'Pending',
//         payment_method: payment.payment_method,
//         transaction_id: paymentIntent.id,
//         payment_date: new Date(),
//     }).execute();
    
//     return { message: 'Payment created successfully', client_secret: paymentIntent.client_secret };
// }
