import twilio from "twilio";
import { prismaClient } from "../../../db/prismaClient.ts";
import { Request, Response } from "express";
import type { AuthLocals } from "../../../middleware/authHandlers.ts";
import type { placeOrder } from "./createOrders.validators.ts";
import { resolveTxt } from "dns";

const accountSid = process.env['TWILIO_ACCOUNT_SID'];
const authToken = process.env['TWILIO_ACCOUNT_TOKEN'];
const fromPhone = process.env['TWILIO_PHONE_NUMBER'];

const client = twilio(accountSid, authToken);

export const sendSms = async (to: string, message: string) => {
  try {
    await client.messages.create({
      body: message,
      from: fromPhone,
      to,
    });
  } catch (error) {
    console.error("SMS sending failed:", error);
  }
};

export const createOrder = async (
    req: Request<unknown, unknown, placeOrder>,
    res: Response<unknown, AuthLocals>,
  ) => {
    const data = req.body;
    const { user } = res.locals;
  
    let order = await prismaClient.order.findFirst({
      where: { userId: user.id, status: "PENDING" },
    });
  
    if (!order) {
      order = await prismaClient.order.create({
        data: { userId: user.id, status: "PENDING" },
      });
    }
  
    const orderProduct = await prismaClient.orderProduct.create({
      data: {
        orderId: order.id,
        productId: data.productId,
        quantity: data.quantity,
      },
    });
  
    // 🛒 Get the product and shop info
    const product = await prismaClient.product.findUnique({
      where: { id: data.productId },
      include: { shop: true },
      select: { name: true, shop: true },
    });
  
    if (product?.shop?.phone) {
      const smsText = `New order received: ${data.quantity} x ${product.name}`;
      await sendSms(product.shop.phone, smsText); // 📲 Send SMS
    }
    res.status(201).json("Order completed message sent");
}