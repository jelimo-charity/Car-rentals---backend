import { Context } from 'hono';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const handleWebhook = async (c: Context) => {
  const sig = c.req.header('stripe-signature') || '';
  const rawBody = await c.req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return c.json({ error: `Webhook Error: ${err.message}` }, 400);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Update your database here with payment intent details
      break;
    // Handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return c.json({ received: true });
};
