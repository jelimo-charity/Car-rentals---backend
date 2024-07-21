import { relations } from 'drizzle-orm';
import { pgTable, boolean, serial, varchar, text, timestamp, integer, pgEnum, numeric } from 'drizzle-orm/pg-core';
import { number } from 'zod';


// types
export type TIUser = typeof Users.$inferInsert;
export type TSUser = typeof Users.$inferSelect;

export type TIAuth = typeof auth.$inferInsert;
export type TSAuth = typeof auth.$inferSelect;

export type TIVehicle = typeof Vehicles.$inferInsert;
export type TSVehicle = typeof Vehicles.$inferSelect;



export type TIBooking = typeof Bookings.$inferInsert;
export type TSBooking = typeof Bookings.$inferSelect;

export type TILocation = typeof Locations.$inferInsert;
export type TSLocation = typeof Locations.$inferSelect;

export type TIPayment = typeof Payments.$inferInsert;
export type TSPayment = typeof Payments.$inferSelect;

export type TICustomerSupportTicket = typeof CustomerSupportTickets.$inferInsert;
export type TSCustomerSupportTicket = typeof CustomerSupportTickets.$inferSelect;

export type TIFleetManagement = typeof FleetManagement.$inferInsert;
export type TSFleetManagement = typeof FleetManagement.$inferSelect;

// 1.USERS TABLE
export const userRoles = pgEnum("userRoles", ["admin", "user"])

export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  full_name: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  contact_phone: varchar('contact_phone', { length: 15 }).notNull(),
  address: text('address').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  role: userRoles('role').default('user').notNull(),
});

//2. AUTH TABLE

 export const auth = pgTable('authentication', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(()=>Users.id, {onDelete: "cascade"}),
    role: userRoles('role').default('user').notNull(),
  });

//3. VEHICLES TABLE

export const Vehicles = pgTable('vehicles', {
    id: serial('id').primaryKey(),
    rental_price: integer('rental_rate').notNull(),
    availability: boolean('availability').default(true),
    image_url: varchar('image_url', { length: 255 }).notNull(),
    manufacturer: varchar('manufacturer', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    year: integer('year').notNull(),
    fuel_type: varchar('fuel_type', { length: 50 }).notNull(),
    seating_capacity: integer('seating_capacity').notNull(),
    features: text('features').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  });




//5. Bookings table 
export const Bookings = pgTable('bookings', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => Users.id, { onDelete: 'cascade' }),
    vehicle_id: integer('vehicle_id').notNull().references(() => Vehicles.id, { onDelete: 'cascade' }),
    location_id: integer('location_id').notNull().references(() => Locations.id, { onDelete: 'cascade' }),
    booking_date: timestamp('booking_date').notNull(),
    return_date: timestamp('return_date').notNull(),
    total_amount: numeric('total_amount').notNull(),
    booking_status: varchar('booking_status', { length: 50 }).default('Pending').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  
  });

  //6. Location table
  export const Locations = pgTable('locations', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    contact_phone: varchar('contact_phone').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  });

  //7. Payments table definition
export const Payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  booking_id: integer('booking_id').notNull().references(() => Bookings.id, { onDelete: 'cascade' }),
  amount: numeric('amount').notNull(),
  payment_status: varchar('payment_status', { length: 50 }).default('Pending').notNull(),
  payment_date: timestamp('payment_date').notNull(),
  payment_method: varchar('payment_method', { length: 255 }).notNull(),
  transaction_id: varchar('transaction_id', { length: 255 }).notNull(),
});


  //8. CustomerSupportTickets table definition
export const CustomerSupportTickets = pgTable('customer_support_tickets', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => Users.id, { onDelete: 'cascade' }),
    subject: varchar('subject', { length: 255 }).notNull(),
    description: varchar('description', { length: 1000 }).notNull(),
    status: varchar('status', { length: 50 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  });

  //9. FleetManagement table definition
export const FleetManagement = pgTable('fleet_management', {
    id: serial('id').primaryKey(),
    vehicle_id: integer('vehicle_id').notNull().references(() => Vehicles.id, { onDelete: 'cascade' }),
    acquisition_date: timestamp('acquisition_date').notNull(),
    depreciation_rate: numeric('depreciation_rate').notNull(),
    current_value: numeric('current_value').notNull(),
    maintenance_cost: numeric('maintenance_cost').notNull(),
    status: varchar('status', { length: 50 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  });

  // 10. Featured table
export const Featured = pgTable("Featured", {
  id: serial('id').primaryKey(),
  vehicle_id: integer('vehicle_id').notNull().references(() => Vehicles.id, { onDelete: 'cascade' }),
  
})


// relations

// Users and Auth relations
export const userRelations = relations(Users, ({ one, many }) => ({
  authentication: one(auth, {
    fields: [Users.id],
    references: [auth.user_id]
  }),
  bookings: many(Bookings),
  customerSupportTickets: many(CustomerSupportTickets)
}));

// Vehicles and VehicleSpecifications relations
export const vehicleRelations = relations(Vehicles, ({ one, many }) => ({
 
  bookings: one(Bookings, {
    fields: [Vehicles.id],
    references: [Bookings.vehicle_id]
  }),
  fleetManagement: one(FleetManagement, {
    fields: [Vehicles.id],
    references: [FleetManagement.vehicle_id]
  })
}));

// Bookings and related entities
export const bookingRelations = relations(Bookings, ({ one }) => ({
  user: one(Users, {
    fields: [Bookings.user_id],
    references: [Users.id]
  }),
  vehicle: one(Vehicles, {
    fields: [Bookings.vehicle_id],
    references: [Vehicles.id]
  }),
  location: one(Locations, {
    fields: [Bookings.location_id],
    references: [Locations.id]
  }),
  payment: one(Payments, {
    fields: [Bookings.id],
    references: [Payments.booking_id]
  })
}));

// Locations and Bookings relations
export const locationRelations = relations(Locations, ({ one, many }) => ({
  bookings: many(Bookings)
}));

// Payments and Bookings relations
export const paymentRelations = relations(Payments, ({ one }) => ({
  booking: one(Bookings, {
    fields: [Payments.booking_id],
    references: [Bookings.id]
  })
}));

// CustomerSupportTickets and Users relations
export const customerSupportTicketRelations = relations(CustomerSupportTickets, ({ one }) => ({
  user: one(Users, {
    fields: [CustomerSupportTickets.user_id],
    references: [Users.id]
  })
}));

// FleetManagement and Vehicles relations
export const fleetManagementRelations = relations(FleetManagement, ({ one }) => ({
  vehicle: one(Vehicles, {
    fields: [FleetManagement.vehicle_id],
    references: [Vehicles.id]
  })
}));

// Featured and Vehicles relations
export const featuredRelations = relations(Featured, ({ one }) => ({
  vehicle: one(Vehicles, {
    fields: [Featured.vehicle_id],
    references: [Vehicles.id]
  })
}));