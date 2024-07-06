import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createCustomerSupportTicket, deleteCustomerSupportTicket, getCustomerSupportTicket, getCustomerSupportTickets, updateCustomerSupportTicket } from "./customerSupport.controller";
import { CustomerSupportTicketSchema } from "../validators";

// Initialize the Hono router for CustomerSupportTickets
export const CustomerSupportTicketRouter = new Hono();

// Define routes and attach respective controller functions
CustomerSupportTicketRouter.get('/CustomerSupportTickets', getCustomerSupportTickets);
CustomerSupportTicketRouter.get('/CustomerSupportTickets/:id', getCustomerSupportTicket);
CustomerSupportTicketRouter.post('/CustomerSupportTickets', zValidator("json", CustomerSupportTicketSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createCustomerSupportTicket);
CustomerSupportTicketRouter.put('/CustomerSupportTickets/:id', zValidator("json", CustomerSupportTicketSchema, (result: any, c: Context) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), updateCustomerSupportTicket);
CustomerSupportTicketRouter.delete('/CustomerSupportTickets/:id', deleteCustomerSupportTicket);
