import { prismaClient } from "../../../db/prismaClient.ts";
import type { AuthLocals} from "../../../middleware/authHandlers.ts";
import type { placeOrder } from "./createOrders.validators.ts";
import type { Request, Response } from "express";

export const createOrder = async (
    req: Request<unknown, unknown, placeOrder>,
    res: Response<unknown, AuthLocals>,
) => {
    const data: placeOrder = req.body;
    const { user } = res.locals;

    let order = await prismaClient.order.findFirst({
        where: {
            userId: user.id,
            status: "PENDING",
        }
    });

    if (!order) {
        order = await prismaClient.order.create({
            data: {
                userId: user.id,
                status: "PENDING",
            }
        });
    }

    const orderProduct = await prismaClient.orderProduct.create({
        data: {
            orderId: order.id,
            productId: data.productId,
            quantity: data.quantity,
        },
    });

    res.status(201).json(orderProduct);
};

