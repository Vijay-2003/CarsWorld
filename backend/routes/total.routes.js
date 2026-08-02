import express from 'express';
import { GetTotalData } from '../controllers/total.controller.js';

const totalRouter = express.Router();

totalRouter.get("/", GetTotalData);

export default totalRouter;