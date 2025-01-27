import { Hono } from "hono";
import {createPaymentController,getPaymentByBookingController, updatePaymentController,deletePaymentController, getPayments, createCheckoutSessionController} from './payment.controller';
// import { userRoleAuth,adminRoleAuth, adminOrUserAuth } from "../middleware/AuthorizeRole";
 
export const paymentsRouter = new Hono();
 
paymentsRouter.post('/payments',createPaymentController);
paymentsRouter.get('/payments', getPayments);

paymentsRouter.get('/payments/:booking_id', getPaymentByBookingController);
paymentsRouter.put('/payments/:id', updatePaymentController);
paymentsRouter.delete('/payments/:id', deletePaymentController);
paymentsRouter.post('/checkout-session', createCheckoutSessionController);