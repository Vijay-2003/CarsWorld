import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config/config.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, X } from 'lucide-react'

const Signup = () => {

  const navigate = useNavigate();
  const [ispass, setispass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null
  })
  const [avatarpreview, setAvatarPreview] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    success: true
  })
  useEffect(() => {
    if(!toast.success) return;
    const timer = setTimeout(() => {
      setToast({
        message: "",
      success: false
      })
    }, 1000);
    return () => clearTimeout(timer);
  }, [toast.message])

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "avatar") {
      setFormData({
        ...formData,
        avatar: files[0]
      })
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("avatar", formData.avatar);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data.success) {
        setisverify(true);
        setToast({
          message: res.data.message,
          success: true
        });

      }
    } catch (error) {
      console.log(error)
      setToast({
        message: error.response?.data?.message || "Server Error",
        success: false
      })

    } finally {
      setLoading(false);
    }
  }


  const [isverify, setisverify] = useState(false);
  const [otp, setOpt] = useState("");
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/verify-email`,
        { email: formData.email, otp }
      )
      if (res.data.success) {
        setToast({
          message: res.data.message,
          success: true,
        })

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error)
      setToast({
        message: error.response?.data?.message || "Server Error",
        success: false
      })
    } finally {
      setLoading(false);
    }
  }

  return (

    isverify ? (
      <div className="min-h-screen bg-black flex items-center justify-center px-5">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center text-white">
            <span className="text-yellow-400">Cars</span>World
          </h1>

          <div className="mt-8 flex justify-center">

            <div className="w-20 h-20 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center">
              📩
            </div>

          </div>

          <h2 className="text-2xl font-bold text-center text-white mt-6">
            Verify Your Email
          </h2>

          <p className="text-zinc-400 text-center mt-3">
            We've sent a verification code to
          </p>

          <p className="text-yellow-400 text-center font-semibold mt-2 break-all">
            your {formData.email}
          </p>

          {/* Toast */}
          {toast.message && (
            <div
              className={` mt-5 w-full rounded-xl py-4 px-5 text-center font-medium border ${toast.success
                ? "bg-green-500/20 border-green-500 text-green-400"
                : "bg-red-500/20 border-red-500 text-red-400"
                }`}
            >
              {toast.message}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6 mt-8">

            <div>

              <label className="text-gray-300">
                Email
              </label>

              <input
                type='text'
                name='email'
                value={formData.email}
                readOnly
                className="w-full mt-2 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-center tracking-[12px] text-xl font-semibold focus:border-yellow-400 outline-none"
                maxLength={6}
                placeholder="000000"
              />

            </div>

            <div>

              <label className="text-gray-300">
                Verification OTP <span className=' text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='otp'
                value={otp}
                onChange={(e) => setOpt(e.target.value)}
                className="w-full mt-2 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-center tracking-[12px] text-xl font-semibold focus:border-yellow-400 outline-none"
                maxLength={6}
                placeholder="000000"
              />

            </div>

            <button
              type='submit'
              className="flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
            >
              {loading ? (
                <>
                  Verifying...
                  <Loader2 className="animate-spin ml-2" size={18} />
                </>
              ) : (
                "Verify Email"
              )}
            </button>

          </form>

          {/* <button className="w-full mt-6 text-yellow-400 hover:text-yellow-300">
            Resend OTP
          </button> */}
{/* 
          <button onClick={() => setisverify(false)} className="w-full mt-3 text-zinc-500 hover:text-white">
            Back To Signup
          </button> */}

        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-black flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8">

          {/* Logo */}

          <h1 className="text-4xl font-bold text-center text-white">
            <span className="text-yellow-400">Cars</span>World
          </h1>

          <p className="text-zinc-400 text-center mt-3 mb-8">
            Create your account and join the world's premium car community.
          </p>

          {/* Toast */}
          {toast.message && (
            <div
              className={` mb-5 w-full rounded-xl py-4 px-5 text-center font-medium border ${toast.success
                ? "bg-green-500/20 border-green-500 text-green-400"
                : "bg-red-500/20 border-red-500 text-red-400"
                }`}
            >
              {toast.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="flex justify-center mb-8">

              <div className="relative">

                <label
                  htmlFor="avatar"
                  className="cursor-pointer"
                >

                  {avatarpreview ? (

                    <img
                      src={avatarpreview}
                      alt='avatar'
                      className="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover"
                    />

                  ) : (

                    <div className="w-28 h-28 rounded-full bg-zinc-800 border-2 border-dashed border-yellow-400 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 transition">
                      Upload
                    </div>

                  )}

                </label>

                <input
                  id="avatar"
                  onChange={handleChange}
                  name='avatar'
                  type="file"
                  accept='image/*'
                  className="hidden"
                />

                {avatarpreview && (
                  <button
                    type='button'
                    onClick={() => {
                      setAvatarPreview(null);
                      setFormData({
                        ...formData,
                        avatar: null
                      })
                      document.getElementById("avatar").value = ""
                    }}
                    className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition"
                  >
                    <X size={15} />
                  </button>
                )}

              </div>

            </div>

            <div>
              <label className="text-gray-300">
                Full Name <span className=' text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="text-gray-300">
                Email <span className=' text-red-500'>*</span>
              </label>

              <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none"
                placeholder="your@gmail.com"
              />
            </div>

            <div>
              <label className="text-gray-300">
                Password <span className=' text-red-500'>*</span>
              </label>

              <div className="relative mt-2">

                <input
                  type={ispass ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 pr-12 text-white focus:border-yellow-400 outline-none"
                  placeholder="Enter password"
                />

                <button
                  type='button'
                  className=" text-amber-300 absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() => setispass(!ispass)}
                >
                  {ispass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

              </div>

            </div>

            <button
              type='submit'
              className=" flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
            >
              {loading ? (
                <>
                  Sending OTP...
                  <Loader2 className="animate-spin ml-2" size={18} />
                </>
              ) : "Create Account"}
            </button>

          </form>

          <p className="text-center text-zinc-500 mt-7">
            Already have an account?
            <button onClick={() => navigate("/login")} className="text-yellow-400 hover:text-yellow-300 ml-2">
              Login
            </button>
          </p>

        </div>
      </div>
    )
  )
}

export default Signup