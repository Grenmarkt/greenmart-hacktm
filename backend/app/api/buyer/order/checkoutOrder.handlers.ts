import twilio from "twilio";
import { prismaClient } from "../../../db/prismaClient.ts";
import type { Request, Response } from "express";
import type { AuthLocals } from "../../../middleware/authHandlers.ts";
import type { placeOrder } from "./createOrders.validators.ts";

const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILIO_ACCOUNT_TOKEN'];

const client = twilio(accountSid, authToken);


const fromWhatsApp = 'whatsapp:+14155238886';

export const sendWhatsApp = async (to: string, message: string) => {
  try {
    await client.messages.create({
      body: 'Ai o noua comanda ' + message,
      from: fromWhatsApp,
      to: `whatsapp:${to}`,
    });
  } catch (error) {
    console.error("WhatsApp message sending failed:", error);
  }
};

export const checkoutOrder = async (
  req: Request<unknown, unknown, placeOrder>,
  res: Response<unknown, AuthLocals>
): Promise<any> => {
  const { user } = res.locals;

  const order = await prismaClient.order.findFirst({
    where: { userId: user.id, status: "PENDING" },
  });

  if (!order) {
    return res.status(404).json({ error: "No pending order found for this user" });
  }

  await prismaClient.order.update({
    where: { id: order.id },
    data: { status: "COMPLETED" },
  });
  console.log("Order status updated to COMPLETED:", order.id);

  const productOrders = await prismaClient.orderProduct.findMany({
    where: { orderId: order.id },
    include: { product: { include: { productType: true, shop: true } } },
  });

  console.log("Found order products:", productOrders);

  for (const product of productOrders) {
    const shopPhone = product.product?.shop?.phone;
    if (shopPhone) {
      const message = `New order: ${product.quantity} x ${product.product?.productType?.name}`;
      console.log("Sending WhatsApp to", shopPhone, "with message:", message);
      await sendWhatsApp(shopPhone, message);
    }
  }

  res.status(201).json("Order completed and WhatsApp messages sent");
};
