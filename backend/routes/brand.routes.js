import express from 'express';
import { AddBrand, DeleteBrand, GetAllBrands, GetBrandById, UpdateBrand } from '../controllers/brand.controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js'
import upload from '../config/multer.js';

const brandRouter = express.Router();

brandRouter.post("/addbrand", AuthMiddleware, upload.fields([
    { "name": "brand_logo", maxCount: 1 },
    { "name": "brand_banner", maxCount: 1 }
]), AddBrand);

brandRouter.get("/allbrands", GetAllBrands);
brandRouter.get("/brandbyid/:id", AuthMiddleware, GetBrandById);

brandRouter.delete("/:id", AuthMiddleware, DeleteBrand);

brandRouter.put("/:id", AuthMiddleware, upload.fields([
    { "name": "brand_logo", maxCount: 1 },
    { "name": "brand_banner", maxCount: 1 }
]), UpdateBrand);

export default brandRouter;