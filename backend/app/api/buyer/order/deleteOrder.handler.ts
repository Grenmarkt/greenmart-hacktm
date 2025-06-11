import { prismaClient } from "../../../db/prismaClient.ts";
import type { Request, Response } from "express";

export const deleteOrder = async (
    req: Request,
    res: Response,
): Promise<any> => {
    
    const orderId = req.params['orderId'];

    const order = await prismaClient.orderProduct.findUnique({
        where: {
            id: orderId,
        },
    });

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const del=await prismaClient.orderProduct.delete({
        where: {
            id: orderId,
        },
    });

    res.status(204).send(del);
};