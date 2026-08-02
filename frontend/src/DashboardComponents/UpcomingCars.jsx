import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpcomingCars = ({ data }) => {
    const navigate = useNavigate();

    return (
        <section className="bg-black py-24">

            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="flex items-end justify-between mb-14">

                    <div>

                        <p className="uppercase tracking-[5px] text-yellow-400 font-semibold">
                            Future Collection
                        </p>

                        <h2 className="text-5xl font-black text-white mt-2">
                            Upcoming Cars
                        </h2>

                        <p className="text-zinc-400 mt-4 max-w-2xl">
                            Get an exclusive first look at the next generation of
                            performance machines arriving soon on CarsWorld.
                        </p>

                    </div>

                    <span className="hidden md:flex px-5 py-2 rounded-full bg-yellow-400 text-black font-bold">
                        {data.getupcomingcars.length} Upcoming
                    </span>

                </div>

                {/* Cars */}

                <div className="space-y-10">

                    {data.getupcomingcars.map((car) => (

                        <div
                            key={car._id}
                            className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden
              hover:border-yellow-400 transition duration-500"
                        >

                            <div className="grid lg:grid-cols-2">

                                {/* Image */}

                                <div className="relative overflow-hidden">

                                    <img
                                        src={car.car_image}
                                        alt={car.name}
                                        className="h-100 w-full object-cover
                    transition duration-700
                    group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent" />

                                    {/* Upcoming Badge */}

                                    <div className="absolute top-6 left-6">

                                        <span
                                            className="px-5 py-2 rounded-full
                      bg-yellow-400 text-black
                      font-bold shadow-xl"
                                        >
                                            Coming Soon
                                        </span>

                                    </div>

                                </div>

                                {/* Content */}

                                <div className="flex flex-col justify-center p-10">

                                    <div className="flex items-center gap-5">

                                        <div className="bg-white rounded-full p-3 shadow-lg">

                                            <img
                                                src={car.brand.brand_logo}
                                                alt={car.brand.brand_name}
                                                className="w-14 h-14 object-contain"
                                            />

                                        </div>

                                        <div>

                                            <p className="uppercase tracking-widest text-yellow-400 text-sm">
                                                {car.brand.brand_name}
                                            </p>

                                            <h2 className="text-4xl font-black text-white mt-1">
                                                {car.name}
                                            </h2>

                                        </div>

                                    </div>

                                    <p className="text-zinc-400 leading-8 mt-8">
                                        Be among the first to explore this upcoming masterpiece.
                                        Experience cutting-edge engineering, unmatched performance,
                                        and the future of automotive excellence.
                                    </p>

                                    <button
                                        onClick={() => navigate(`/car/info/${car._id}`)}
                                        className="cursor-pointer mt-10 w-fit flex items-center gap-3
                    bg-yellow-400 hover:bg-yellow-300
                    text-black font-bold
                    px-8 py-4 rounded-full
                    transition hover:scale-105"
                                    >
                                        View Details

                                        <ArrowRight size={20} />

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default UpcomingCars;