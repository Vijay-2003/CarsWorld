import express from 'express';
import {AuthMiddleware} from '../middleware/auth.middleware.js'
import { GetBannedUser } from '../controllers/ban.controller.js';

const banRouter = express.Router();

banRouter.get("/users", AuthMiddleware, GetBannedUser);

export default banRouter;