import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import axios from 'axios';
import { BASE_URL } from '../config/config';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    success: false
  })
  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(() => {
      setToast({
        message: "",
        success: false
      })
    }, 1000);
    return () => clearTimeout(timer);
  }, [toast.message])

  const email = location.state?.email || "";
  const [formData, setFormData] = useState({
    email,
    otp: "",
    newPassword: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("email", formData.email);
    data.append("otp", formData.otp);
    data.append("newPassword", formData.newPassword);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/reset-password`, formData)

      if (res.data.success) {
        setToast({
          message: res.data.message,
          success: true
        })

        setTimeout(() => {
          navigate("/login")
        }, 1500);
      }
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
    <div className="min-h-screen bg-black flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8">

        {/* Logo */}

        <h1 className="text-4xl font-bold text-center text-white">
          <span className="text-yellow-400">Cars</span>World
        </h1>

        {/* Icon */}

        <div className="flex justify-center mt-8">

          <div className="w-20 h-20 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-3xl">
            🔒
          </div>

        </div>

        {/* Heading */}

        <h2 className="text-2xl font-bold text-center text-white mt-6">
          Reset Password
        </h2>

        <p className="text-center text-zinc-400 mt-3 mb-8">
          Enter the OTP sent to your email and choose a new password.
        </p>

        {/* Toast */}

        {toast.message && (
          <div
            className={`mb-6 p-3 rounded-xl text-center border ${toast.success
              ? "bg-green-500/20 border-green-500 text-green-400"
              : "bg-red-500/20 border-red-500 text-red-400"
              }`}
          >
            {toast.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}

          <div>

            <label className="text-zinc-300">
              Email Address
            </label>

            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed"
            />

          </div>

          {/* OTP */}

          <div>

            <label className="text-zinc-300">
              Verification OTP
            </label>

            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              maxLength={6}
              placeholder="000000"
              className="w-full mt-2 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-center tracking-[10px] text-xl font-semibold outline-none focus:border-yellow-400"
            />

          </div>

          {/* Password */}

          <div>

            <label className="text-zinc-300">
              New Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 pr-12 text-white outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className=" flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
          >
            {loading ? (
              <>
                Resetting Password...
                <Loader2 className=' animate-spin' />
              </>
            ) : "Reset Password"}
          </button>

        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-6 text-zinc-400 hover:text-white transition"
        >
          ← Back to Login
        </button>

      </div>
    </div>
  )
}

export default ResetPassword