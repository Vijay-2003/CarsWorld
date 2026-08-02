import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/api'
import { BlinkBlur } from 'react-loading-indicators'
import {
    Car,
    Users,
    Building2,
    Ban,
    Star,
    Clock,
} from 'lucide-react'

const Dashboard = () => {

    const [ok, setOk] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {

            const token = localStorage.getItem("token");

            try {

                const res = await axios.get(`${BASE_URL}/api/total`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.success) {
                    setData(res.data);
                    setOk(true);
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchDashboard();

    }, []);

    if (!ok) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <BlinkBlur
                    color="#fff200"
                    size="medium"
                    text="Dashboard Loading..."
                    textColor="#ffffff"
                />
            </div>
        )
    }

    const stats = [
        {
            title: "Cars",
            value: data.total.cars,
            icon: <Car size={30} />,
        },
        {
            title: "Users",
            value: data.total.users,
            icon: <Users size={30} />,
        },
        {
            title: "Brands",
            value: data.total.brands,
            icon: <Building2 size={30} />,
        },
        {
            title: "Reviews",
            value: data.total.reviews,
            icon: <Star size={30} />,
        },
        {
            title: "Banned Users",
            value: data.total.bannedusers,
            icon: <Ban size={30} />,
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8">

            <h1 className="text-4xl font-bold mb-10">
                Dashboard
            </h1>

            {/* Stats */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

                {stats.map((item, index) => (

                    <div
                        key={index}
                        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-400 transition"
                    >

                        <div className="flex justify-between items-center">

                            <div>
                                <p className="text-zinc-400">
                                    {item.title}
                                </p>

                                <h2 className="text-4xl font-bold mt-3">
                                    {item.value}
                                </h2>
                            </div>

                            <div className="text-yellow-400">
                                {item.icon}
                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* Cars By Status */}

            <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Cars By Status
                </h2>

                <div className="grid md:grid-cols-3 gap-5">

                    <div className="bg-green-500/20 rounded-xl p-5">
                        <h3 className="text-green-400 font-bold">
                            Available
                        </h3>

                        <p className="text-4xl mt-3">
                            {data.carsByStatus.available}
                        </p>
                    </div>

                    <div className="bg-yellow-500/20 rounded-xl p-5">

                        <h3 className="text-yellow-400 font-bold">
                            Upcoming
                        </h3>

                        <p className="text-4xl mt-3">
                            {data.carsByStatus.upcoming}
                        </p>

                    </div>

                    <div className="bg-red-500/20 rounded-xl p-5">

                        <h3 className="text-red-400 font-bold">
                            Discontinued
                        </h3>

                        <p className="text-4xl mt-3">
                            {data.carsByStatus.discontinued}
                        </p>

                    </div>

                </div>

            </div>

            {/* Recent Data */}

            <div className="grid lg:grid-cols-2 gap-8 mt-12">

                {/* Recent Cars */}

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Recent Cars
                    </h2>

                    <div className="space-y-4">

                        {data.recentcars.map(car => (

                            <div
                                key={car._id}
                                className="flex items-center gap-4 border-b border-zinc-800 pb-4"
                            >

                                <img
                                    src={car.car_image}
                                    className="w-20 h-20 rounded-xl object-cover"
                                />

                                <div>

                                    <h3 className="font-semibold">
                                        {car.name}
                                    </h3>

                                    <p className="text-zinc-400 text-sm">
                                        {new Date(car.createdAt).toLocaleDateString("en-GB")}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Recent Brands */}

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                    <h2 className="text-2xl font-bold mb-5">
                        Recent Brands
                    </h2>

                    {data.recentbrands.map(brand => (

                        <div
                            key={brand._id}
                            className="flex items-center gap-4 mb-5"
                        >

                            <img
                                src={brand.brand_logo}
                                className="w-14 h-14 rounded-full bg-white p-2"
                            />

                            <div>

                                <h3>{brand.brand_name}</h3>

                                <p className="text-zinc-400 text-sm">
                                    {new Date(brand.createdAt).toLocaleDateString("en-GB")}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* Bottom */}

            <div className="grid lg:grid-cols-3 gap-8 mt-12">

                {/* Recent Users */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Recent Users
                    </h2>

                    <div className="space-y-4">

                        {data.recentusers.map(user => (

                            <div
                                key={user._id}
                                className="flex items-center gap-4 border-b border-zinc-800 pb-4"
                            >

                                <img
                                    src={user.avatar}
                                    className="w-14 h-14 rounded-full object-cover"
                                />

                                <div>

                                    <h3>
                                        {user.name}
                                    </h3>

                                    <p className="text-zinc-400 text-sm">
                                        {user.email}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
                

                {/* Reviews */}

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                    <h2 className="text-2xl font-bold mb-5">
                        Latest Reviews
                    </h2>

                    {data.recentreviews.map(review => (

                        <div
                            key={review._id}
                            className="mb-5"
                        >

                            <h3 className="font-semibold">
                                {review.user?.name}
                            </h3>

                            <p className="text-yellow-400">
                                {review.car?.name}
                            </p>

                            <p className="text-zinc-400 text-sm">
                                {new Date(review.createdAt).toLocaleDateString("en-GB")}
                            </p>

                        </div>

                    ))}

                </div>

                {/* Banned */}

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                    <h2 className="text-2xl font-bold mb-5">
                        Recent Banned Users
                    </h2>

                    {data.recentbannedusers.map(user => (

                        <div
                            key={user._id}
                            className="flex items-center gap-3 mb-5"
                        >

                            <Ban className="text-red-500" />

                            <div>

                                <h3>{user.email}</h3>

                                <p className="text-zinc-400 text-sm">
                                    {new Date(user.createdAt).toLocaleDateString("en-GB")}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Dashboard;