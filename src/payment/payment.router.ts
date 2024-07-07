import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createPayment, deletePayment, getPayment, getPayments, updatePayment } from "./payment.controller";
import { PaymentSchema } from "../validators"; // Assuming you have a payment validator schema defined

// Initialize the Hono router for payments
export const PaymentRouter = new Hono();

// Define routes and attach respective controller functions
PaymentRouter.get('/payments', getPayments);
PaymentRouter.get('/payments/:id', getPayment);
PaymentRouter.post('/payments', zValidator("json", PaymentSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createPayment);
PaymentRouter.put('/payments/:id', zValidator("json", PaymentSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), updatePayment);
PaymentRouter.delete('/payments/:id', deletePayment);

export default PaymentRouter;
