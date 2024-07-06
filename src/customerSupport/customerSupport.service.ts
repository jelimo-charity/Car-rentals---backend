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

export const createCustomerSupportTicketservice = async (book: TICustomerSupportTicket

) => {
    await db.insert(CustomerSupportTickets).values(book).execute();
    return "Book created successfully";
};


export const updateCustomerSupportTicketservice = async (id: number, book: TICustomerSupportTicket) => {
    await db.update(CustomerSupportTickets).set(book).where(eq(CustomerSupportTickets.id, id)).execute();
    return "CustomerSupportTickets updated successfully";
};


export const deleteCustomerSupportTicketservice = async (id: number) => {
    await db.delete(CustomerSupportTickets).where(eq(CustomerSupportTickets.id, id)).execute();
    return "CustomerSupportTickets deleted successfully";
};




