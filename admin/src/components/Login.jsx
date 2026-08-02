import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/api";
import axios from "axios";
import { Eye, EyeOff, Loader2, LucidePanelBottomClose } from 'lucide-react'

const Login = () => {
    const [formdata, setFormData] = useState({
        email: "",
        password: "",
    });
    const [seepass, setseepass] = useState(false);
    const [isforgetpass, setisforgetpass] = useState(false);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        success: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${BASE_URL}/api/auth/login`,
                formdata
            );

            if (res.data.success) {
                setToast({
                    message: "Login Successful",
                    success: true
                });

                console.log(res);

                localStorage.setItem(
                    "token",
                    res.data.token
                );

                setTimeout(() => {
                    navigate("/");
                }, 1500);

            }
        } catch (error) {
            setToast({
                message: error.response?.data?.message || "Login Failed",
                success: false
            });
        }
    };

    const handleForgotPassword = () => {
        setisforgetpass(true);
    };

    const handleforgot = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/forgot-password`,
                {email: formdata.email}
            )

            setToast({
                message: res.data.message,
                success: true
            })

            setTimeout(() => {
                navigate("/reset-password",{
                    state: {email: formdata.email}
                })
            }, 1000);

        } catch (error) {
            console.log(error);
             setToast({
                message: error.response?.data?.message || "Server Error",
                success: false
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        isforgetpass ? (
            <div className="min-h-screen bg-black flex items-center justify-center px-5">
                <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">

                    {/* Logo */}

                    <h1 className="text-3xl font-bold text-center text-white">
                        <span className="text-yellow-400">Cars</span>World
                    </h1>

                    <p className="text-zinc-400 text-center mt-3 mb-8">
                        Enter your registered email address and we'll send you a password reset OTP.
                    </p>

                    {/* Toast */}

                    {toast.message && (
                        <div
                            className={`mb-5 p-3 rounded-lg text-center font-medium ${toast.success
                                    ? "bg-green-500/20 text-green-400 border border-green-500"
                                    : "bg-red-500/20 text-red-400 border border-red-500"
                                }`}
                        >
                            {toast.message}
                        </div>
                    )}

                    <form onSubmit={handleforgot} className="space-y-6">

                        <div>
                            <label className="block text-gray-300 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formdata.email}
                                onChange={handleChange}
                                placeholder="Enter your registered email"
                                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition duration-300 hover:cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    Sending OTP...
                                    <Loader2 className="animate-spin" size={20} />
                                </>
                            ) : (
                                "Send Reset OTP"
                            )}
                        </button>

                    </form>

                </div>
            </div>
        ) : (
            <div className="min-h-screen bg-black flex items-center justify-center px-5">
                <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
                    {/* Logo */}
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">
                        <span className="text-yellow-400">
                            Cars
                        </span>
                        World
                        <h3 className=" text-yellow-400">Admin Panel</h3>
                    </h1>
                    

                    {/* Toast */}
                    {toast.message && (
                        <div
                            className={`mb-5 p-3 rounded-lg text-center font-medium ${toast.success
                                ? "bg-green-500/20 text-green-400 border border-green-500"
                                : "bg-red-500/20 text-red-400 border border-red-500"
                                }`}
                        >
                            {toast.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-gray-300">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formdata.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="w-full mt-2 bg-black border border-zinc-700 
                            rounded-lg px-4 py-3 text-white 
                            focus:outline-none focus:border-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="text-gray-300">
                                Password
                            </label>

                            <div className="relative mt-2">

                                <input
                                    type={seepass ? "text" : "password"}
                                    name="password"
                                    value={formdata.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-yellow-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setseepass(!seepass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {seepass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-yellow-400 hover:text-yellow-300 transition cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full bg-yellow-400 text-black 
                        py-3 rounded-lg font-bold 
                        hover:bg-yellow-300 transition
                        hover:cursor-pointer"
                        >
                            {toast.success ? <> Redirecting <Loader2 className="animate-spin" size={20} /> </> : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};


export default Login;