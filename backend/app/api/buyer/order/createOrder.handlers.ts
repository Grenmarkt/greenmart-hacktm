import { prismaClient } from "../../../db/prismaClient.ts";
import type { AuthLocals } from "../../../middleware/authHandlers.ts";
import type { placeOrder } from "./createOrders.validators.ts";
import type { Request, Response } from "express";

export const createOrder = async (
    req: Request<unknown, unknown, placeOrder>,
    res: Response<unknown, AuthLocals>,
) => {
    const { user } = res.locals; 
    
    const order = await prismaClient.order.create({
        data: {
            userId: user.id,
        },
    });

    const order_product = await prismaClient.orderProduct.create({
        data: {
            orderId: order.id,
            productId: req.body.productId,
            quantity: req.body.quantity,
        }
    })
    
    res.status(201).json(order);
};
