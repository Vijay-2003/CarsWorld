import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../config/api";

const ResetEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [formData, setFormData] = useState({
        email,
        otp: "",
        newPassword: ""
    });

    const [seePass, setSeePass] = useState(false);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        success: false,
    });
    useEffect(() => {
        if (!toast.message) return;
        const timer = setTimeout(() => {
            setToast({
                message: "",
                success: false
            })
        }, 1000);
        return () => clearTimeout(timer);
    },[toast.message])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("email", formData.email);
        data.append("otp", formData.otp);
        data.append("newPassword", formData.newPassword);
    
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/reset-password`, formData);

            setToast({
                message: res.data.message,
                success: true
            })

            setTimeout(() => {
                navigate("/login")
            }, 1500);

        } catch (error) {
            setToast({
                message: error.response?.data?.message || "Server Error",
                success: false
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-5">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-center text-white">
                    <span className="text-yellow-400">Cars</span>World
                </h1>

                <p className="text-zinc-400 text-center mt-3 mb-8">
                    Enter the OTP sent to your email and choose a new password.
                </p>

                {toast.message && (
                    <div
                        className={`mb-5 p-3 rounded-lg text-center font-medium ${
                            toast.success
                                ? "bg-green-500/20 text-green-400 border border-green-500"
                                : "bg-red-500/20 text-red-400 border border-red-500"
                        }`}
                    >
                        {toast.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="text-gray-300">Email</label>

                        <input
                            type="email"
                            value={formData.email}
                            readOnly
                            className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-400 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="text-gray-300">OTP</label>

                        <input
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            placeholder="Enter OTP"
                            className="w-full mt-2 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"
                        />
                    </div>

                    <div>
                        <label className="text-gray-300">
                            New Password
                        </label>

                        <div className="relative mt-2">
                            <input
                                type={seePass ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-yellow-400"
                            />

                            <button
                                type="button"
                                onClick={() => setSeePass(!seePass)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {seePass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
                    >
                        {loading ? (
                            <>
                                Resetting...
                                <Loader2 className="animate-spin" size={20} />
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ResetEmail;