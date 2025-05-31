import type { Request, Response } from 'express';
import type { AuthLocals } from "../../../middleware/authHandlers.ts";
import { becomeSellerSchema } from "./products.validators.ts";
import { prismaClient } from '../../../db/prismaClient.ts';
import { Role } from '@prisma/client';

export const becomeSeller= async (
    req: Request<unknown, AuthLocals>,
    res: Response,
) => {
    const validData = becomeSellerSchema.parse(req.body);

    const { user } = res.locals;

    const shop = await prismaClient.shop.create({
        data: {
            ...validData,
            user: {
                connect: {
                    id: user.id,
                },
        },
    }});

    await   prismaClient.user.update({
        where: {
            id: user.id
        },
        data: {
            role: Role.SELLER,
        },
    });

    res.status(201).json({user,shop});
}