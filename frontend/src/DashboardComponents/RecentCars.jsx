import React from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentCars = ({ data }) => {
    const navigate = useNavigate();

    return (
        <section className="bg-black py-24">

            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="flex items-end justify-between mb-14">

                    <div>

                        <p className="uppercase tracking-[5px] text-yellow-400 font-semibold">
                            Fresh Arrivals
                        </p>

                        <h2 className="text-5xl font-black text-white mt-2">
                            Recently Added Cars
                        </h2>

                        <p className="text-zinc-400 mt-4 max-w-2xl">
                            Explore the latest vehicles added to CarsWorld.
                            Discover premium sports cars, luxury sedans and exotic
                            supercars from the world's biggest brands.
                        </p>

                    </div>

                    <span className="hidden md:flex px-5 py-2 rounded-full bg-yellow-400 text-black font-bold">
                        {data.recentcars.length} New Cars
                    </span>

                </div>

                {/* Grid */}

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {data.recentcars.map((car) => (

                        <div
                            key={car._id}
                            className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-400 transition duration-500"
                        >

                            {/* Image */}

                            <div className="relative overflow-hidden">

                                <img
                                    src={car.car_image}
                                    alt={car.name}
                                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                                {/* Brand Logo */}

                                <div className="absolute top-5 left-5 bg-white rounded-full p-3 shadow-xl">

                                    <img
                                        src={car.brand.brand_logo}
                                        alt={car.name}
                                        className="w-12 h-12 object-contain"
                                    />

                                </div>

                            </div>

                            {/* Content */}

                            <div className="p-7 flex flex-col h-64">

                                <div>
                                    <h2 className="text-3xl font-black text-white leading-tight min-h-19">
                                        {car.name}
                                    </h2>

                                    <div className="flex items-center gap-2 mt-4 text-zinc-400">

                                        <CalendarDays size={18} />

                                        <span>
                                            {new Date(car.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>

                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/car/info/${car._id}`)}
                                    className="mt-auto cursor-pointer flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-full transition hover:scale-105 w-fit"
                                >
                                    View Details
                                    <ArrowRight size={18} />
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default RecentCars;