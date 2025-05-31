import { prismaClient } from "../../../db/prismaClient.ts";
import type { OrderLocals } from "../../../middleware/authHandlers.ts";
import type { placeOrder } from "./createOrders.validators.ts";
import type { Request, Response } from "express";

export const createOrder = async (
    req: Request<unknown, unknown, placeOrder>,
    res: Response<unknown, OrderLocals>,
) => {
    const data: placeOrder = req.body;
    const { order } = res.locals;

    const orderProducts = await prismaClient.order.findFirst({
        where: {
            id: order.id,
            
        }
    })

    const usersWithoutOrders = await prismaClient.user.findMany({
        where: {
            orders: {
                none: {},
            },
        },
    });

    const createdOrders = await Promise.all(
        usersWithoutOrders.map(async (user) => {
            return await prismaClient.order.create({
                data: {
                    userId: user.id,
                },
            });
        })
    );



   res.status(201).json(createdOrders);
}

