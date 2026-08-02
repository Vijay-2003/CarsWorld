import express from 'express';
import {AuthMiddleware} from '../middleware/auth.middleware.js'
import { AddUserReview, DeleteUserReview, GetAllReviews, GetCarReviews, GetReviewByUser, UpdateUserReview } from '../controllers/review.controller.js';

const reviewRouter = express.Router();

reviewRouter.get("/", GetAllReviews);

reviewRouter.get("/user", AuthMiddleware, GetReviewByUser);

reviewRouter.post("/:id", AuthMiddleware, AddUserReview);

reviewRouter.get("/carreview/:id", AuthMiddleware, GetCarReviews);

reviewRouter.put("/:id", AuthMiddleware, UpdateUserReview);

reviewRouter.delete("/:id", AuthMiddleware, DeleteUserReview);

export default reviewRouter;
