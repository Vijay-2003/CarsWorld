import express from 'express';
import {AuthMiddleware} from '../middleware/auth.middleware.js'
import { DeleteAWhislist, GetUserProfile, WhislistCar } from '../controllers/whislist.controller.js'

const whislistRouter = express.Router();

whislistRouter.get("/profile", AuthMiddleware, GetUserProfile)

whislistRouter.post("/favourite/:id", AuthMiddleware, WhislistCar);

whislistRouter.delete("/:id", AuthMiddleware, DeleteAWhislist);

export default whislistRouter;