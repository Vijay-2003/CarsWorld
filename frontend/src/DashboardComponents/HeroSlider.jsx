import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {useNavigate} from 'react-router-dom'

const HeroSlider = ({ data }) => {
    
    const navigate = useNavigate();

    const cars = data?.recentcars || [];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (cars.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % cars.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [cars]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % cars.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? cars.length - 1 : prev - 1
        );
    };

    if (!cars.length) return null;

    return (
        <section className="relative h-screen overflow-hidden bg-black">

            {/* Images */}

            {cars.map((car, index) => (
                <img
                    key={car._id}
                    src={car.car_image}
                    alt={car.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000
                    ${
                        index === current
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-110"
                    }`}
                />
            ))}

            {/* Overlay */}

            <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/20" />

            {/* Content */}

            <div className="absolute inset-0 flex items-center">

                <div className="max-w-7xl mx-auto px-8 w-full">

                    <div className="max-w-2xl animate-fade">

                        <div className="flex items-center gap-4 mb-6">

                            <div className="bg-white rounded-full p-3 shadow-xl">

                                <img
                                    src={cars[current].brand.brand_logo}
                                    alt={cars[current].name}
                                    className="w-14 h-14 object-contain"
                                />

                            </div>

                            <div>

                                <p className="uppercase tracking-[6px] text-yellow-400 text-sm font-semibold">
                                    Recently Added
                                </p>

                                <h3 className="text-xl font-semibold text-white">
                                    {cars[current].brand.brand_name}
                                </h3>

                            </div>

                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight">
                            {cars[current].name}
                        </h1>

                        <p className="mt-6 text-zinc-300 text-lg leading-8 max-w-xl">
                            Discover the newest additions to CarsWorld.
                            Browse luxury supercars, upcoming models,
                            specifications and expert reviews.
                        </p>

                        <button
                            onClick={() => navigate("/cars")}
                            className="mt-10 cursor-pointer bg-yellow-400
                            hover:bg-yellow-300
                            text-black
                            font-bold
                            px-10
                            py-4
                            rounded-full
                            transition
                            hover:scale-105"
                        >
                            Explore Cars
                        </button>

                    </div>

                </div>

            </div>

            {/* Left */}

            <button
                onClick={prevSlide}
                className="cursor-pointer absolute left-8 top-1/2 -translate-y-1/2
                w-14 h-14 rounded-full bg-black/40 backdrop-blur
                border border-zinc-700 hover:border-yellow-400
                flex items-center justify-center"
            >
                <ChevronLeft />
            </button>

            {/* Right */}

            <button
                onClick={nextSlide}
                className="cursor-pointer absolute right-8 top-1/2 -translate-y-1/2
                w-14 h-14 rounded-full bg-black/40 backdrop-blur
                border border-zinc-700 hover:border-yellow-400
                flex items-center justify-center"
            >
                <ChevronRight />
            </button>

            {/* Indicators */}

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">

                {cars.map((_, index) => (

                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-3 rounded-full transition-all
                        ${
                            current === index
                                ? "w-10 bg-yellow-400"
                                : "w-3 bg-white/50"
                        }`}
                    />

                ))}

            </div>

        </section>
    );
};

export default HeroSlider;