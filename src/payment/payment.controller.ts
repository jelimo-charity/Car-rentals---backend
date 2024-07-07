import { createPaymentService, deletePaymentService, getPaymentService, paymentsService, updatePaymentService } from './payment.service';
import { Context } from 'hono';


// Get all payments
export const getPayments = async (c: Context) => {
    try {
        const payments = await paymentsService();
        return c.json({ payments }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Get a single payment by id
export const getPayment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        const payment = await getPaymentService(id);
        if (!payment) {
            return c.json({ error: 'Payment not found' }, 404);
        }
        return c.json({ payment }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Create a new payment
export const createPayment = async (c: Context) => {
    try {
        const payment = await c.req.json();
        const message = await createPaymentService(payment);
        return c.json({ msg: message }, 201);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Update a payment
export const updatePayment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        const payment = await c.req.json();
        const message = await updatePaymentService(id, payment);
        return c.json({ msg: message }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

// Delete a payment
export const deletePayment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        const message = await deletePaymentService(id);
        return c.json({ msg: message }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
