import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config/config'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [ispass, setispass] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    success: false
  })
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({
        message: "",
        success: false
      })
    }, 1500);
    return () => clearTimeout(timer);
  }, [toast.message]);

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
    data.append("password", formData.password);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToast({
          message: res.data.message,
          success: true
        });
        setTimeout(() => {
          navigate("/");
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

  const [isforgotpass, setisforgotpass] = useState(false);
  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
        email: formData.email
      });
      if (res.data.success) {
        setToast({
          message: res.data.message,
          success: true
        })
        setTimeout(() => {
          navigate("/reset-password", {
            state: { email: formData.email }
          })
        }, 1000);
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
    isforgotpass ? (
      <div className="min-h-screen bg-black flex items-center justify-center px-5">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8">

          <h1 className="text-4xl font-bold text-center text-white">
            <span className="text-yellow-400">Cars</span>World
          </h1>

          <div className="flex justify-center mt-8">

            <div className="w-20 h-20 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-3xl">
              🔑
            </div>

          </div>

          <h2 className="text-2xl font-bold text-center text-white mt-6">
            Forgot Password
          </h2>

          <p className="text-center text-zinc-400 mt-3 mb-8">
            Enter your registered email address and we'll send you a password reset OTP.
          </p>

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

          <form onSubmit={handleForgot} className="space-y-6">

            <div>

              <label className="text-zinc-300">
                Email Address <span className=' text-red-600'>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full mt-2 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className=" flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
            >
              {loading ?
                (
                  <>
                    Sending OTP...
                    <Loader2 className=' animate-spin' />
                  </>
                ) : "Send OTP"}
            </button>

          </form>

          <button
            onClick={() => setisforgotpass(false)}
            className="w-full mt-6 text-zinc-400 hover:text-white"
          >
            ← Back to Login
          </button>

        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-black flex items-center justify-center px-5">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

          {/* Logo */}

          <h1 className="text-4xl font-bold text-center text-white">
            <span className="text-yellow-400">Cars</span>World
          </h1>

          <p className="text-zinc-400 text-center mt-3 mb-8">
            Welcome back. Sign in to continue.
          </p>

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

            <div>
              <label className="text-zinc-300">
                Email Address <span className=' text-red-600'>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full mt-2 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
              />
            </div>

            <div>

              <label className="text-zinc-300">
                Password <span className=' text-red-600'>*</span>
              </label>

              <div className="relative mt-2">

                <input
                  type={ispass ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 pr-12 text-white outline-none focus:border-yellow-400"
                />

                <button
                  onClick={() => setispass(!ispass)}
                  type="button"
                  className=" text-yellow-400 absolute right-4 top-1/2 -translate-y-1/2 hover:text-white"
                >
                  {ispass ? <EyeOff /> : <Eye />}
                </button>

              </div>

            </div>

            <div className="flex justify-end">

              <button
                type="button"
                onClick={() => setisforgotpass(true)}
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                Forgot Password?
              </button>

            </div>

            <button
              type="submit"
              disabled={loading}
              className=" flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
            >
              {loading ? (
                <>
                  Signing In...
                  <Loader2 className=' animate-spin' />
                </>
              ) : "Login"}
            </button>

          </form>

          

          <p className="text-center text-zinc-500 mt-7">
            Don't have an account?

            <button
              onClick={() => navigate("/signup")}
              className="text-yellow-400 ml-2 hover:text-yellow-300"
            >
              Create Account
            </button>

          </p>

        </div>
      </div>
    )
  )
}

export default Login