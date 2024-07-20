import { db } from "../drizzle/db";
import { Payments, TIPayment } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import "dotenv/config";
import { stripe } from "../drizzle/db";
 
export const createPaymentService = async (payment: TIPayment) => {
    await db.insert(Payments).values(payment).execute();
    return 'Payment created successfully';
 
}
export const getPaymentsService = async () => {
  return await db.query.Payments.findMany();
}
 
export const getPaymentByBookingService = async (booking_id: number) => {
    return await db.query.Payments.findFirst({
        where: eq(Payments.booking_id, booking_id),
    });
}
 
export const updatePaymentService = async (id: number, payment: TIPayment) =>{
    await db.update(Payments).set(payment).where(eq(Payments.id, id)).execute();
    return 'Payment updated successfully';
}
 
//update payment session_id
export const updatePaymentSessionIdService = async (session_id: string) =>{
    await db.update(Payments).set({payment_status: "Completed"}).where(eq(Payments.transaction_id, session_id)).execute();
    return 'PaymentSession updated successfully';
}
 
export const deletePaymentService = async (id: number) => {
    await db.delete(Payments).where(eq(Payments.id, id)).execute();
    return 'Payment deleted successfully';
}
 