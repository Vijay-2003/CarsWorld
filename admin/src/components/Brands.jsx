import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/api.js'
import { useNavigate } from 'react-router-dom'
import { BlinkBlur } from 'react-loading-indicators'

const Brands = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [ok, setok] = useState(false);
    const [search, setSearch] = useState("");

    const filterbrand = brands.filter((brand) => {
        const matchearch = brand.brand_name.toLowerCase().includes(search.toLowerCase());
        return matchearch;
    })

    useEffect(() => {
        const fetchbrands = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/brand/allbrands`);
                // console.log(res.data);
                if (res.data.success) {
                    setok(true);
                }
                setBrands(res.data.brands);
            } catch (error) {
                console.log(error.response?.data?.message || "Server error")
            }
        }
        fetchbrands();
    }, [])

    if (!ok) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
                <BlinkBlur color="#fff200" size="medium" text="Brands Loading..." textColor="#ffffff" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-8">

            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Brand..."
                    className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {filterbrand.map((d) => (
                    <div onClick={() => navigate(`/brand/info/${d._id}`)}
                        key={d._id}
                        className=" cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 shadow-lg"
                    >

                        {/* Banner */}

                        <div className="relative h-48">

                            <img
                                src={d.brand_banner}
                                alt={d.brand_name}
                                className="w-full h-full object-cover "
                            />

                            {/* Dark Overlay */}

                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* Brand Logo */}

                            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">

                                <div className="w-24 h-24 rounded-full bg-white p-3 shadow-xl border-4 border-yellow-400">

                                    <img
                                        src={d.brand_logo}
                                        alt={d.brand_name}
                                        className="w-full h-full object-contain"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Content */}

                        <div className="pt-16 pb-6 px-6 text-center">

                            <h2 className="text-2xl font-bold text-white">
                                {d.brand_name}
                            </h2>

                            <p className="text-yellow-400 mt-2">
                                {d.totalCars} {d.totalCars == 1 ? "Car" : "Cars"}
                            </p>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Brands