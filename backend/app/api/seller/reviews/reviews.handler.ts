import { prismaClient } from "../../../db/prismaClient.ts";
import type { Request, Response } from 'express';
import  {type getReviewData } from "./review.validators.ts";


export const getReviews = async (req: Request,res: Response<getReviewData[]>)=> {

    const reviews = await prismaClient.review.findMany({
        where:
        {
            shopId: req.params['shopId'],
        },
    });
    res.status(200).json(reviews);
}

export const getReview = async (req: Request, res: Response<{ rating: number }>) => {
    
    const reviews = await prismaClient.review.findMany({
        where:
        {
            shopId: req.params['shopId'],
        },
        select: {
            rating: true
        }
    });

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    let averageRating = 0;
    averageRating = reviews.length > 0 
            ? totalRating / reviews.length 
            : 0;
    
    res.status(200).json({ rating: averageRating });
};