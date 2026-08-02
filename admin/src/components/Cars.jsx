import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config/api'
import { useNavigate } from 'react-router-dom';
import { BlinkBlur } from 'react-loading-indicators'

const Cars = () => {

    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [ok, setok] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const filtercar = cars.filter((car) => {
        const matchsearch = car.name.toLowerCase().includes(search.toLowerCase());
        const brandsearch = "All" || car.brand.brand_name.toLowerCase().includes(search.toLowerCase());
        return matchsearch && brandsearch;
    })

    useEffect(() => {
        const GetALLCars = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/car/allcars`);
                // console.log(res.data);
                setCars(res.data.cars)
                if (res.data.success) setok(true);
            } catch (error) {
                console.log(error.response?.data?.message || "Internal Server Error");
            }
        }
        GetALLCars();

    }, [])

    if (!ok) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
                <BlinkBlur color="#fff200" size="medium" text="Cars Loading..." textColor="#ffffff" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-8">
            {/* Search */}

            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Cars..."
                    className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
                />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-8">

                {filtercar.map((car) => (
                    <div
                        onClick={() => navigate(`/car/info/${car._id}`)}
                        key={car._id}
                        className=" cursor-pointer relative group rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400 transition duration-300 shadow-lg"
                    >

                        {/* Car Image */}

                        <img
                            src={car.car_image}
                            alt={car.name}
                            className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                        />

                        {/* Gradient */}

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent"></div>

                        {/* Brand Logo */}

                        <div className="absolute top-4 left-4 w-14 h-14 bg-white rounded-full p-2 flex items-center justify-center shadow-lg">

                            <img
                                src={car.brand.brand_logo}
                                alt={car.brand.brand_name}
                                className="w-full h-full object-cover"
                            />

                        </div>

                        {/* Bottom Content */}

                        <div className="absolute bottom-0 left-0 w-full p-5">

                            <h2 className="text-2xl font-bold text-white">
                                {car.name}
                            </h2>

                            <p className="text-yellow-400 font-medium">
                                {car.brand.brand_name}
                            </p>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Cars