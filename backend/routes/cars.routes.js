import express from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware.js'
import upload from '../config/multer.js';
import { AddCar, DeleteCar, GetAllCars, GetCarById, UpdateCar } from '../controllers/cars.controller.js';

const carRouter = express.Router();

carRouter.post("/addcars", AuthMiddleware, upload.fields([
    { "name": "car_image", maxCount: 1 },
    { "name": "gallery", maxCount: 10 }
]), AddCar)

carRouter.get("/allcars", GetAllCars);
carRouter.get("/:id", AuthMiddleware, GetCarById);

carRouter.delete("/:id", AuthMiddleware, DeleteCar);

carRouter.put("/:id", AuthMiddleware, upload.fields([
    { name: "car_image", maxCount: 1 },
    { name: "gallery", maxCount: 20 }
]), UpdateCar);


export default carRouter;