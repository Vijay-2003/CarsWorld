import User from '../models/user.model.js'
import Car from '../models/cars.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerificationEmail, sendForgotPasswordEmail, sendAdminInquiryEmail } from '../config/emailservice.js'
import Ban from '../models/banneduser.model.js'
import Inquiry from '../models/inquiry.model.js'

export const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const avatar = req.file?.path || "";

        const banned = await Ban.findOne({ email });
        if (banned) {
            return res.status(403).json({
                success: false,
                message: "This email has been banned for not following our guidelines",
            });
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all Required fields",
                type: "error",
                success: false
            })
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({
                message: "User Already Exists",
                type: "error",
                success: false
            })
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#]).*$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                type: "error",
                success: false,
            });
        }

        const hashedpass = await bcrypt.hash(password, 10);

        // to generate otp
        const verificationOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationOTPExpires = Date.now() + 10 * 60 * 1000 // 10mins

        const user = await User.create({
            name,
            email,
            password: hashedpass,
            avatar,
            verificationOTP,
            verificationOTPExpires
        })

        //to send the verification email
        try {
            await sendVerificationEmail(email, name, verificationOTP);
        } catch (error) {
            await User.findByIdAndDelete(user._id);
            console.error("Failed to send verification email:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to send verification email."
            });
        }

        res.status(201).json({
            message: "Verify Your Email",
            type: "success",
            success: true,
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isVerified: false
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            type: "error",
            success: false
        })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const banned = await Ban.findOne({ email });
        if (banned) {
            return res.status(403).json({
                success: false,
                message: "This email has been banned for not following our guidelines",
            });
        }

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User Doesn't Exist",
                type: "error",
                success: false
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message: "Please Verify Your Email Address Before Logging In.",
                success: false
            })
        }

        const comparepass = await bcrypt.compare(password, user.password);
        if (!comparepass) {
            return res.status(400).json({
                message: "Password Or Email Is Incorrect",
                type: "error",
                success: false
            })
        }

        const token = await jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            "expiresIn": "7d"
        })

        res.status(200).json({
            message: "Login Successfull",
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isVerified: user.isVerified
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            type: "error",
            success: false
        })
    }
}

export const verifyEmail = async (req, res) => {
    try {

        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email And OTP Are Required.",
                success: false,
                type: "error"
            })
        }

        const user = await User.findOne({
            email,
            verificationOTP: otp,
            verificationOTPExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid Or Expired OTP.",
                success: false,
                type: "error"
            })
        }

        user.isVerified = true;
        user.verificationOTP = undefined;
        user.verificationOTPExpires = undefined;
        await user.save();

        res.status(200).json({
            message: "Email Verified Successfully! You Can Now Log In.",
            success: true,
            type: "success"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            type: "error",
            success: false,
            error: error.message
        })
    }
}

export const ForgotPassword = async (req, res) => {
    try {

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email Is Required",
                success: false,
                type: "error"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User With This Email Not Found",
                success: false,
                type: "error"
            })
        }

        const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const resetOTPExpires = Date.now() + 10 * 60 * 1000 //10mins

        user.resetPasswordOTP = resetOTP;
        user.resetPasswordOTPExpires = resetOTPExpires;
        await user.save();

        try {
            await sendForgotPasswordEmail(email, user.name, resetOTP);
        } catch (error) {
            console.error("Failed to send reset email:", error);
        }

        res.status(200).json({
            message: "Password Reset OTP Sent To Your Email",
            success: true,
            type: "success"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            type: "error",
            error: error.message
        })
    }
}

export const ResetPassword = async (req, res) => {
    try {

        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: "Email, OTP And New Password Are Required",
                success: false,
                type: "error"
            })
        }

        const user = await User.findOne({
            email,
            resetPasswordOTP: otp,
            resetPasswordOTPExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid Or Expired OTP",
                success: false,
                type: "error"
            })
        }

        // to hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpires = undefined;

        await user.save();

        res.status(200).json({
            message: "Password Reset Successfull. You Can Now Login With Your New Password",
            success: true,
            type: "success"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            type: "error",
            error: error.message
        })
    }
}

export const GetAllUsers = async (req, res) => {
    try {
        const user = await User.find().sort({ createdAt: -1 }).populate({
            path: "wishlist",
            select: "name"
        });

        res.status(200).json({
            success: true,
            type: "success",
            message: "All Users Found",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            type: "error",
            message: error.message || "Internal Server Error",
        });
    }
}

export const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({
                message: "User Not Found",
                success: false,
            });
        }

        const banuser = await Ban.create({
            email: user.email
        })

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User Deleted And Banned Successfully!",
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            type: "error",
            message: error.message || "Internal Server Error",
        });
    }
}

export const SendEnquiryMail = async (req, res) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;
        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({
                message: "Please fill all required fields",
                success: false
            })
        }

        const inquiry = await Inquiry.create({
            fullName,
            email,
            phone,
            subject,
            message
        })

        try {
            await sendAdminInquiryEmail({ fullName, email, phone, subject, message });
        } catch (error) {
            console.error("Failed to notify the admin via email", error);
            return res.status(400).json({
                message: "Failed to send inquiry mail",
                success: false
            })
        }

        res.status(201).json({
            success: true,
            inquiry,
            message: "Inquiry Submitted Successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}