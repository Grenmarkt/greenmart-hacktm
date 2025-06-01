import type { Request, Response } from 'express';
import { prismaClient } from '../../../db/prismaClient.ts';
import type { AuthLocals } from '../../../middleware/authHandlers.ts';
export const getOrderProducts= async(
    req: Request,
    res: Response<unknown, AuthLocals>) =>
{
    const {user} = res.locals;

    const order = await prismaClient.order.findMany({
        where: {
            userId: user.id,
            status: 'PENDING'
        }
    });


    const orderProducts = await Promise.all(order.map(async (order) => {
            return await prismaClient.orderProduct.findMany({
                where: {
                    orderId: order.id
                },
                include:
                {
                    product: {
                        include: {
                            productType: true,
                            shop: true
                        }
                    }
                }
            });
        }));

    
    res.status(202).json(orderProducts);
}