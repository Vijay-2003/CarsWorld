import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { } from 'lucide-react'
import { BASE_URL } from '../config/config'
import { BlinkBlur } from 'react-loading-indicators'
import { useNavigate } from 'react-router-dom'

const MyFavourite = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ok, setisok] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [search, setSearch] = useState("");

    const filterwishlist = wishlist.filter((f) => {
        const matchcarsearch = f.name.toLowerCase().includes(search.toLowerCase());
        const matchbrandsearch = f.brand.brand_name.toLowerCase().includes(search.toLowerCase());
        return matchbrandsearch || matchcarsearch;
    })

    useEffect(() => {
        const GetWishlist = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${BASE_URL}/api/wishlist/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    setisok(true)
                    setWishlist(res.data.wishlist)
                    // console.log(res.data);
                }

            } catch (error) {
                console.log(error.response?.data?.message || error);
            }
        }
        GetWishlist();
    }, [])

    const DeleteWishlist = async (id) => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.delete(`${BASE_URL}/api/wishlist/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success) {
                setWishlist((prev) => prev.filter(car => car._id !== id))
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (!ok) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
                <BlinkBlur color="#fff200" size="medium" text="Favourites Loading..." textColor="#ffffff" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Hero */}
            <section className="border-b border-zinc-800 bg-linear-to-b from-zinc-900 via-black to-black">
                <div className="max-w-7xl mx-auto px-6 py-14">

                    <h1 className="text-5xl font-black">
                        My <span className="text-yellow-400">Wishlist</span>
                    </h1>

                    <p className="mt-4 text-zinc-400 text-lg max-w-2xl">
                        All your dream cars saved in one place.
                    </p>

                    {/* Search */}

                    <input
                        type="text"
                        placeholder="Search by car or brand..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mt-8 w-full max-w-xl bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-white outline-none focus:border-yellow-400"
                    />

                    {/* {toast.message && (
                        <div
                            className={`mt-6 max-w-xl rounded-xl p-4 border text-center font-semibold ${toast.success
                                    ? "bg-green-500/20 border-green-500 text-green-400"
                                    : "bg-red-500/20 border-red-500 text-red-400"
                                }`}
                        >
                            {toast.message}
                        </div>
                    )} */}
                </div>
            </section>

            {/* Wishlist */}

            <section className="max-w-7xl mx-auto px-6 py-12">

                {filterwishlist.length === 0 ? (

                    search ? (

                        <div className="flex flex-col items-center justify-center py-28">

                            <div className="text-7xl">🔍</div>

                            <h2 className="text-4xl font-bold mt-6">
                                No Matching Wishlist
                            </h2>

                            <p className="text-zinc-500 mt-4">
                                We couldn't find any cars in your wishlist matching "{search}".
                            </p>

                        </div>

                    ) : wishlist.length === 0 ? (

                        <div className="flex flex-col items-center justify-center py-28">

                            <div className="w-32 h-32 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-6xl">
                                ❤️
                            </div>

                            <h2 className="mt-8 text-4xl font-bold">
                                Your Wishlist is Empty
                            </h2>

                            <p className="mt-4 text-zinc-500 text-center max-w-xl">
                                Start exploring premium cars and save your favourites.
                                They'll appear here instantly.
                            </p>

                            <button
                                onClick={() => navigate("/cars")}
                                className="mt-8 cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl transition"
                            >
                                Explore Cars
                            </button>

                        </div>) : null

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {filterwishlist.map((car) => (

                            <div
                                key={car._id}
                                className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-yellow-400 hover:-translate-y-2 transition duration-300 shadow-xl"
                            >

                                {/* Image */}

                                <div className="relative overflow-hidden">

                                    <img
                                        src={car.car_image}
                                        alt={car.name}
                                        className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                                    />

                                    <div className="absolute top-4 left-4 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">

                                        <img
                                            src={car.brand.brand_logo}
                                            alt={car.brand.brand_name}
                                            className="w-9 h-9 object-contain"
                                        />

                                    </div>

                                </div>

                                {/* Content */}

                                <div className="p-6 flex flex-col h-60">

                                    <div>
                                        <p className="text-yellow-400 uppercase tracking-widest text-sm">
                                            {car.brand.brand_name}
                                        </p>

                                        <h2 className="text-3xl font-bold mt-2 leading-tight min-h-19">
                                            {car.name}
                                        </h2>
                                    </div>

                                    <div className="mt-auto grid grid-cols-2 gap-4">

                                        <button
                                            onClick={() => navigate(`/car/info/${car._id}`)}
                                            className="cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold transition hover:scale-105"
                                        >
                                            View Car
                                        </button>

                                        <button
                                            disabled={loading}
                                            onClick={() => DeleteWishlist(car._id)}
                                            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition hover:scale-105"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    )
}

export default MyFavourite