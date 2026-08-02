import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/config'
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Clock3,
    MessageSquare,
} from "lucide-react";

const Contact = () => {

    const [inquiryData, setInquiryData] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        success: false
    })
    useEffect(() => {
        const timer = setTimeout(() => {
            setToast({
                message: "",
                success: false
            })
        }, 1000);
        return () => clearTimeout(timer);
    }, [toast.message])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiryData({
            ...inquiryData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/contact`, inquiryData);
            if (res.data.success) {
                setToast({
                    message: res.data.message,
                    success: true
                })
                setInquiryData({
                    fullName: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
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
        <div className="min-h-screen bg-black text-white">

            {/* Hero */}

            <section className="relative overflow-hidden border-b border-zinc-800">

                <div className="absolute inset-0 bg-linear-to-r from-yellow-500/10 via-transparent to-red-500/10" />

                <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">

                    <p className="uppercase tracking-[6px] text-yellow-400 font-semibold">
                        Contact Us
                    </p>

                    <h1 className="text-6xl font-black mt-6">
                        We'd Love To
                        <span className="text-yellow-400"> Hear From You</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-zinc-400 mt-8 text-lg leading-8">
                        Whether you have questions about a vehicle, want to suggest a new
                        brand, report an issue, or simply say hello, our team is always
                        ready to help.
                    </p>

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Contact Info */}

                    <div className="lg:col-span-2 space-y-8">

                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                            <h2 className="text-3xl font-bold mb-8">
                                Contact Information
                            </h2>

                            <div className="space-y-8">

                                <div className="flex gap-5">

                                    <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-black">
                                        <Mail size={24} />
                                    </div>

                                    <div>

                                        <h4 className="font-bold text-lg">Email</h4>

                                        <p className="text-zinc-400">
                                            support@carsworld.com
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-5">

                                    <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-black">
                                        <Phone size={24} />
                                    </div>

                                    <div>

                                        <h4 className="font-bold text-lg">Phone</h4>

                                        <p className="text-zinc-400">
                                            +91 98765 43210
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-5">

                                    <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-black">
                                        <MapPin size={24} />
                                    </div>

                                    <div>

                                        <h4 className="font-bold text-lg">Location</h4>

                                        <p className="text-zinc-400">
                                            Mumbai, Maharashtra, India
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-5">

                                    <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-black">
                                        <Clock3 size={24} />
                                    </div>

                                    <div>

                                        <h4 className="font-bold text-lg">
                                            Support Hours
                                        </h4>

                                        <p className="text-zinc-400">
                                            Monday - Saturday
                                        </p>

                                        <p className="text-zinc-400">
                                            9:00 AM - 8:00 PM
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="bg-linear-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-black">

                            <MessageSquare size={42} />

                            <h3 className="text-3xl font-black mt-5">
                                Fast Support
                            </h3>

                            <p className="mt-4 text-black/80 leading-7">
                                Most enquiries are answered within 24 hours. We appreciate
                                your patience and will get back to you as soon as possible.
                            </p>

                        </div>

                    </div>

                    {/* Form */}

                    <div className="lg:col-span-3">

                        <form
                            onSubmit={handleSubmit}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10"
                        >

                            <h2 className="text-4xl font-bold mb-10">
                                Send an Enquiry
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">

                                <input
                                    name="fullName"
                                    value={inquiryData.fullName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="bg-black border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
                                />

                                <input
                                    name="email"
                                    value={inquiryData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    type="email"
                                    className="bg-black border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
                                />

                                <input
                                    name="phone"
                                    value={inquiryData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="bg-black border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
                                />

                                <input
                                    name="subject"
                                    value={inquiryData.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                    className="bg-black border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
                                />

                            </div>

                            <textarea
                                rows={8}
                                name="message"
                                value={inquiryData.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                className="mt-6 w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 resize-none outline-none focus:border-yellow-400"
                            />

                            {toast.message && (
                                <div
                                    className={`mt-6 p-4 rounded-xl border text-center ${toast.success
                                            ? "bg-green-500/20 border-green-500 text-green-400"
                                            : "bg-red-500/20 border-red-500 text-red-400"
                                        }`}
                                >
                                    {toast.message}
                                </div>
                            )}

                            <button
                                disabled={loading}
                                className="mt-8 w-full cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-xl transition flex items-center justify-center gap-3"
                            >
                                <Send size={20} />

                                {loading ? "Sending..." : "Send Enquiry"}

                            </button>

                        </form>

                    </div>

                </div>

            </section>

        </div>
    )
}

export default Contact