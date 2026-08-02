import express from 'express';
import { DeleteUser, ForgotPassword, GetAllUsers, Login, ResetPassword, SendEnquiryMail, SignUp, verifyEmail } from '../controllers/auth.controller.js';
import upload from '../config/multer.js';
import {AuthMiddleware} from '../middleware/auth.middleware.js'

const authRouter = express.Router();

authRouter.post("/signup", upload.single("avatar"), SignUp);
authRouter.post("/login", Login);

authRouter.post("/verify-email", verifyEmail);

authRouter.post("/forgot-password", ForgotPassword);
authRouter.post("/reset-password", ResetPassword);

authRouter.get("/", GetAllUsers)

authRouter.post("/contact", SendEnquiryMail);

authRouter.delete("/:id", AuthMiddleware, DeleteUser);


export default authRouter;