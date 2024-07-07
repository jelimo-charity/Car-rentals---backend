import { eq } from 'drizzle-orm';
import { TIPayment, TSPayment, Payments } from '../drizzle/schema';
import { db } from '../drizzle/db';

// Get all payments
export const paymentsService = async (): Promise<TSPayment[] | null> => {
    return await db.select().from(Payments).execute();
}

// Get a single payment by ID
export const getPaymentService = async (id: number): Promise<TSPayment | undefined> => {
    const paymentArray = await db.select().from(Payments).where(eq(Payments.id, id)).execute();
    return paymentArray[0];
}

// Create a new payment
export const createPaymentService = async (payment: TIPayment) => {
    await db.insert(Payments).values(payment).execute();
    return "Payment created successfully";
}

// Update a payment
export const updatePaymentService = async (id: number, payment: TIPayment) => {
    await db.update(Payments).set(payment).where(eq(Payments.id, id)).execute();
    return "Payment updated successfully";
}

// Delete a payment
export const deletePaymentService = async (id: number) => {
    await db.delete(Payments).where(eq(Payments.id, id)).execute();
    return "Payment deleted successfully";
}
