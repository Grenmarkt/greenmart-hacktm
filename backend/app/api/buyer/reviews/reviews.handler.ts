import type { AuthLocals} from "../../../middleware/authHandlers.ts";
import type { Request, Response } from "express";
import type { CreateReviewData } from "./reviews.validators.ts";
import { prismaClient } from "../../../db/prismaClient.ts";

export const createReview = async (
    req: Request,
    res: Response<unknown, AuthLocals>,
) => {

    const data: CreateReviewData = req.body;
    const userr = res.locals.user;
    const shop = await prismaClient.shop.findFirst({
        where: {
            userId: userr.id,
        },
    });

    if (!shop) {
        return res.status(404).json({ message: "Shop not found for this user" });
    }

    await prismaClient.review.create({
        data: {
            userId: userr.id,
            shopId: shop.id,
            rating: data.rating,
            comment: data.comment,
        }})
        
    return res.status(201).json({ message: "Review created successfully" });
}