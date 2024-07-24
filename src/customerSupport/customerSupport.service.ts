import { db } from './../drizzle/db';
import { eq } from 'drizzle-orm';
import {   CustomerSupportTickets, TICustomerSupportTicket, TSCustomerSupportTicket } from '../drizzle/schema';

export const getCustomerSupportTicketsService = async(): Promise<TSCustomerSupportTicket[] | null> => {
  const CustomerSupportTicketsData = await db.select().from(CustomerSupportTickets);
  return CustomerSupportTicketsData
   
}

export const getCustomerSupportTicketservice = async (id: number): Promise<TSCustomerSupportTicket | undefined> => {
    const CustomerSupportTicketsData = await db.select().from(CustomerSupportTickets).where(eq(CustomerSupportTickets.id, id)).execute();
    if (CustomerSupportTicketsData.length === 0) {
        return undefined;
    }
    return CustomerSupportTicketsData[0];
};

export const createCustomerSupportTicketservice = async (ticket: TICustomerSupportTicket

) => {
    await db.insert(CustomerSupportTickets).values(ticket).execute();
    return "ticket created successfully";
};


export const updateCustomerSupportTicketservice = async (id: number, ticket: TICustomerSupportTicket) => {
    await db.update(CustomerSupportTickets).set(ticket).where(eq(CustomerSupportTickets.id, id)).execute();
    return "CustomerSupportTickets updated successfully";
};


export const deleteCustomerSupportTicketservice = async (id: number) => {
    await db.delete(CustomerSupportTickets).where(eq(CustomerSupportTickets.id, id)).execute();
    return "CustomerSupportTickets deleted successfully";
};




