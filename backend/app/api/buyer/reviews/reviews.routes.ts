import { Router } from "express";
import { authHandler } from "../../../middleware/authHandlers.ts";
import { createReview } from "./reviews.handler.ts";

const router = Router();

router.post('/', authHandler, createReview);  

export { router as reviewsRouter };