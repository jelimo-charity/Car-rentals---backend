import { varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  full_name: z.string().max(255),
  email: z.string().email().max(255),
  password: z.string().max(255),
  contact_phone: z.string().max(15),
  address: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const AuthSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  role: z.enum(['admin', 'user']),
});

export const VehicleSchema = z.object({
  rental_rate: z.number(),
  availability: z.boolean(),
  manufacturer: z.string().max(255),
  model: z.string().max(255),
  year: z.number().int(),
  fuel_type: z.string().max(50),
  seating_capacity: z.number().int(),
  features: z.string(),
  image_url: z.string().url(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});





// export const BookingSchema = z.object({
//   id: z.number().int().optional(), // Auto-generated, so it's optional
//   user_id: z.number().int(),
//   vehicle_id: z.number().int(),
//   location_id: z.number().int(),
//   booking_date: z.date(),
//   return_date: z.date(),
//   total_amount: z.number(),
//   booking_status: z.string().max(50).optional(),
//   created_at: z.date().optional(), // Auto-generated
//   updated_at: z.date().optional(), // Auto-generated
// });

export const BookingSchema = z.object({
  id: z.number().optional(),
  user_id: z.number().int(),
  vehicle_id: z.number().int(),
  location_id: z.number().int(),
  booking_date: z.string(),
  return_date: z.string(),
  total_amount: z.number(),
  booking_status: z.string().max(50).optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});


export const LocationSchema = z.object({
  name: z.string().max(255),
  address: z.string().max(255),
  contact_phone: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const PaymentSchema = z.object({
  id: z.number().int(),
  booking_id: z.number().int(),
  amount: z.number(),
  payment_status: z.string().max(50).default('Pending'),
  payment_date: z.date(),
  payment_method: z.string().max(255),
  transaction_id: z.string().max(255),
});

export const CustomerSupportTicketSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  subject: z.string().max(255),
  description: z.string().max(1000),
  status: z.string().max(50),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const FleetManagementSchema = z.object({
  id: z.number().int(),
  vehicle_id: z.number().int(),
  acquisition_date: z.date(),
  depreciation_rate: z.number(),
  current_value: z.number(),
  maintenance_cost: z.number(),
  status: z.string().max(50),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});
