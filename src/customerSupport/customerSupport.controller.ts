import { Context } from "hono";
import { createCustomerSupportTicketservice, deleteCustomerSupportTicketservice, getCustomerSupportTicketsService, getCustomerSupportTicketservice, updateCustomerSupportTicketservice } from "./customerSupport.service";


export const getCustomerSupportTickets= async(c: Context) => {
    try {
        const data = await getCustomerSupportTicketsService();
        if(!data || data.length === 0) { 
            return c.text("CustomerSupportTicket not found")
        }
        return c.json(data, 200)
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}


export const getCustomerSupportTicket = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTicket = await getCustomerSupportTicketservice(id);
    if (!CustomerSupportTicket) {
        return c.text("CustomerSupportTicket not found", 404);
    }
    return c.json(CustomerSupportTicket, 200);
};


export const createCustomerSupportTicket = async (c: Context) => {
    try {
        const CustomerSupportTicket = await c.req.json();
        const createdCustomerSupportTicket = await createCustomerSupportTicketservice(CustomerSupportTicket);
        if (!createdCustomerSupportTicket) return c.text("Book not created", 404);
        return c.json({ msg: createdCustomerSupportTicket }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateCustomerSupportTicket = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTicket = await c.req.json();
    try {
        // Search for the CustomerSupportTicket
        const searchedCustomerSupportTicket = await getCustomerSupportTicketservice(id);
        if (searchedCustomerSupportTicket == undefined) return c.text("CustomerSupportTicket not found", 404);

        // Get the data and update it
        const res = await updateCustomerSupportTicketservice(id, CustomerSupportTicket);
        // Return a success message
        if (!res) return c.text("CustomerSupportTicket not updated", 404);

        return c.json({ msg: res }, 201);
       } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}


export const deleteCustomerSupportTicket = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getCustomerSupportTicketservice(id);
        if (!book) return c.text("CustomerSupportTicket not found", 404);
        const res = await deleteCustomerSupportTicketservice(id);
        if (!res) return c.text("CustomerSupportTicket not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

