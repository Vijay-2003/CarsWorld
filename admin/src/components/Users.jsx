import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config/api'
import { Verified, VerifiedIcon } from 'lucide-react'
import { BlinkBlur } from 'react-loading-indicators'

const Users = () => {

    const [users, setUsers] = useState([]);
    const [banusers, setBanUsers] = useState([]);
    const [ok, setok] = useState(false);
    const [toast, setToast] = useState({
        message: "",
        success: false
    })

    useEffect(() => {
        const GetALLUsers = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/auth/`);
                // console.log(res.data);
                if (res.data.success) setok(true);
                setUsers(res.data.user)
            } catch (error) {
                console.log(error.response?.data?.message || "Internal Server Error");
            }
        }
        GetALLUsers();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.delete(`${BASE_URL}/api/auth/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.success) {
                setToast({
                    message: res.data.message,
                    success: true
                })

                setUsers(users.filter(user => user._id !== id));
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            setToast({
                message: error.response?.data?.message || "Server Error",
                success: false
            })
        }
    }

    useEffect(() => {
        const GetBannedUsers = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${BASE_URL}/api/ban/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(res.data);
                if (res.data.success) setok(true);
                setBanUsers(res.data.users);

            } catch (error) {
                console.log(error.response?.data?.message || "Internal Server Error");
            }
        }
        GetBannedUsers();
    }, []);

    if (!ok) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
                <BlinkBlur color="#fff200" size="medium" text="Users Loading..." textColor="#ffffff" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white">
                    Users
                </h1>
                <p className="text-zinc-400 mt-2">
                    Manage all registered users
                </p>
                {toast.message && (
                    <div
                        className={`mt-6 mb-8 rounded-xl px-4 py-3 text-center font-medium border ${toast.success
                            ? "bg-green-500/20 border-green-500 text-green-400"
                            : "bg-red-500/20 border-red-500 text-red-400"
                            }`}
                    >
                        {toast.message}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {users.map((u) => (

                    <div
                        key={u._id}
                        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-400 hover:-translate-y-2 transition-all duration-300 shadow-lg"
                    >

                        {/* Avatar */}

                        <div className="flex justify-center">

                            <img
                                src={u.avatar}
                                alt={u.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
                            />

                        </div>

                        {/* User Info */}

                        <div className="mt-5 text-center">

                            <h2 className="text-xl font-bold text-white">
                                {u.name}
                            </h2>

                            <p className="text-zinc-400 text-sm mt-1 break-all">
                                {u.email}
                            </p>

                        </div>

                        {/* Joined */}

                        <div className="mt-6 flex justify-between items-center text-sm">

                            <span className="text-zinc-500">
                                Joined
                            </span>

                            <span className="text-white">
                                {new Date(u.createdAt).toLocaleDateString("en-GB")}
                            </span>

                        </div>

                        {/* Verification */}

                        <div className="mt-5 flex flex-col gap-3">

                            {u.isVerified ? (
                                <span className="flex items-center justify-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                                    <Verified size={18} />
                                    Verified
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium">
                                    <Verified size={18} />
                                    Unverified
                                </span>
                            )}

                            <button
                                onClick={() => handleDelete(u._id)}
                                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold cursor-pointer"
                            >
                                Ban User
                            </button>

                        </div>

                    </div>

                ))}
            </div>

            <div className="mt-20">

                <h1 className="text-4xl font-bold text-red-500">
                    Banned Users
                </h1>

                <p className="text-zinc-400 mt-2">
                    Users permanently banned from the platform
                </p>

                {
                    banusers.length === 0 ? (
                        <div className="text-center text-zinc-400 text-xl py-10">
                            No banned users found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">

                            {banusers.map((user) => (

                                <div
                                    key={user._id}
                                    className="bg-zinc-900 border border-red-700 rounded-2xl p-6"
                                >

                                    <div className="flex justify-center mb-6">

                                        <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-4xl font-bold text-white">
                                            🚫
                                        </div>

                                    </div>

                                    <h2 className="text-lg font-bold text-center text-white break-all">
                                        {user.email}
                                    </h2>

                                    <p className="text-center text-red-400 mt-4 font-medium">
                                        Banned
                                    </p>

                                    <p className="text-center text-zinc-500 text-sm mt-3">
                                        {new Date(user.createdAt).toLocaleDateString("en-GB")}
                                    </p>

                                </div>

                            ))}

                        </div>
                    )
                }

            </div>

        </div >
    )
}

export default Users