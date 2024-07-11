import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  getAllPayment,
  getOnePayment,
  createCheckout,
  deletePayment,
  success,
  failed,
} from "./payment.controller";
 
export const paymentRoutes = new Hono();
 
paymentRoutes.get("/payments", getAllPayment);
paymentRoutes.get("/payments/:id", getOnePayment);
// paymentRoutes.post("/payments", createPayment);
paymentRoutes.delete("/payments/:id", deletePayment);
 
//=========payment implementation=====
paymentRoutes.post("/checkout", createCheckout);
paymentRoutes.get("/success", success);
paymentRoutes.get("/cancel", failed);