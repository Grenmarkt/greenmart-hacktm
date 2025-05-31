import { prismaClient } from '../../../db/prismaClient.ts';
import type { Request, Response } from 'express';

export const getShop = async (req: Request, res: Response) => {
    try {
        const shopId = req.params["sellerId"];
        
        if (!shopId) {
            res.status(400).json({ error: "Shop ID is required" });
            return;
        }

        const shop = await prismaClient.shop.findUnique({
            where: { id: shopId },
            include: {
                Product: true,
                review:true, 
            }
        });

        if(!shop) res.status(404).json({ error: "Shop not found" });
        res.status(200).json(shop);
    } catch (error) {
        console.error("Error fetching shop:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};