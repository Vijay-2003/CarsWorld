import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config/api.js'
import axios from 'axios'
import { BlinkBlur } from 'react-loading-indicators'
 
const CarInfo = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [toast, setToast] = useState({
        message: "",
        success: false
    })
    const navigate = useNavigate();

    useEffect(() => {
        const GetCarById = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${BASE_URL}/api/car/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                // console.log(res.data);
                setCar(res.data.car);

            } catch (error) {
                console.log(error);
            }
        }
        GetCarById()
    }, [id])

    const [loading, setLoading] = useState(false);
    const handleDelete = async (id) => {
        // console.log(id);
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.delete(`${BASE_URL}/api/car/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                setToast({
                    message: res.data.message,
                    success: true
                })
                
                setTimeout(() => {
                    navigate("/cars");
                }, 1500);
            }
        } catch (error) {
            console.error(error);
            setToast({
                message: error.response?.data?.message || "Server Error",
                success: true
            })
        } finally {
            setLoading(false);
        }
    }

    if (!car) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
                <BlinkBlur color="#fff200" size="medium" text="CarInfo Loading..." textColor="#ffffff" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Hero Image */}

            <div className="relative h-125">

                <img
                    src={car.car_image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute bottom-10 left-10 flex items-center gap-5">

                    <div className="w-24 h-24 rounded-full bg-white p-3 border-4 border-yellow-400">

                        <img
                            src={car.brand.brand_logo}
                            alt={car.brand.brand_name}
                            className="w-full h-full object-contain"
                        />

                    </div>

                    <div>

                        <h1 className="text-5xl font-bold">
                            {car.name}
                        </h1>

                        <p className="text-yellow-400 text-xl">
                            {car.brand.brand_name}
                        </p>

                    </div>

                </div>

            </div>

            <div className="max-w-7xl mx-auto p-8">

                {/* Basic Info */}

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

                        <h2 className="text-yellow-400 text-2xl font-bold mb-6">
                            Specifications
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span>Model</span>
                                <span>{car.model}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Price</span>
                                <span>${car.price.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Status</span>
                                <span>{car.status}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Launch Year</span>
                                <span>{car.launch_year}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Body Type</span>
                                <span>{car.body_type}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Engine Capacity</span>
                                <span>{car.engine_capacity} cc</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Mileage</span>
                                <span>{car.mileage} km/l</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Top Speed</span>
                                <span>{car.top_speed} km/h</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Drive Type</span>
                                <span>{car.drive_type}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Seats</span>
                                <span>{car.seating_capacity}</span>
                            </div>

                        </div>

                        {/* Admin Actions */}

                        <div className="grid grid-cols-2 gap-4 mt-8">

                            <button
                                onClick={() => navigate(`/update-car/${car._id}`)}
                                className="py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold cursor-pointer"
                            >
                                Update Car
                            </button>

                            <button
                                onClick={() => handleDelete(car._id)}
                                className="py-3 rounded-xl bg-red-500 hover:bg-red-600 transition text-white font-semibold cursor-pointer"
                            >
                                {loading ? "Deleting..." : "Delete Car"}
                            </button>

                        </div>

                    </div>

                    {/* Description */}

                    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

                        <h2 className="text-yellow-400 text-2xl font-bold mb-6">
                            Description
                        </h2>

                        <p className="text-zinc-300 leading-8">
                            {car.description}
                        </p>

                    </div>

                </div>

                {/* Colors */}

                <div className="mt-10 bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

                    <h2 className="text-yellow-400 text-2xl font-bold mb-6">
                        Available Colors
                    </h2>

                    <div className="flex flex-wrap gap-3">

                        {car.colors.map((color, index) => (

                            <span
                                key={index}
                                className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold"
                            >
                                {color}
                            </span>

                        ))}

                    </div>

                </div>

                {/* Safety */}

                <div className="mt-10 bg-zinc-900 rounded-2xl p-6 border border-zinc-800">

                    <h2 className="text-yellow-400 text-2xl font-bold mb-6">
                        Safety Features
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        {car.safety_features.map((feature, index) => (

                            <div
                                key={index}
                                className="bg-black rounded-lg p-4 border border-zinc-700"
                            >
                                {feature}
                            </div>

                        ))}

                    </div>

                </div>

                {/* Gallery */}

                <div className="mt-10">

                    <h2 className="text-yellow-400 text-2xl font-bold mb-6">
                        Gallery
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        {car.gallery.map((image, index) => (

                            <img
                                key={index}
                                src={image}
                                alt=""
                                className="rounded-2xl h-64 w-full object-cover border border-zinc-800 hover:border-yellow-400 transition"
                            />

                        ))}

                    </div>

                </div>

            </div>
        </div>
    );
}

export default CarInfo