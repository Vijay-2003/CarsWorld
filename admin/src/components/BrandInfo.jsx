import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../config/api'
import { BlinkBlur } from 'react-loading-indicators';

const BrandInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brandid, setBrandId] = useState("");
    const [banner, setBanner] = useState(null);
    const [founder, setFounder] = useState("");
    const [logo, setLogo] = useState(null);
    const [name, setName] = useState("");
    const [created, setCreated] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [headquarters, setHeadquarters] = useState("");
    const [founded, setFounded] = useState("");
    const [motto, setMotto] = useState("");
    const [cars, setCars] = useState([]);
    const [ok, setok] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        success: false,
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchbrandinfo = async () => {

            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${BASE_URL}/api/brand/brandbyid/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.success) {
                    setok(true);
                }
                const b = res.data.brand;
                setBrandId(b._id);
                setBanner(b.brand_banner);
                setFounder(b.brand_founder);
                setCountry(b.country);
                setHeadquarters(b.headquarters);
                setFounded(b.founded);
                setMotto(b.motto);
                setLogo(b.brand_logo);
                setName(b.brand_name);
                setCreated(b.createdAt);
                setDescription(b.description);

                const c = res.data.cars;
                setCars(c);
                // console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchbrandinfo();
    }, [id]);

    const handleDelete = async (id) => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.delete(`${BASE_URL}/api/brand/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setToast({
                message: res.data.message,
                success: true,
            });

            setTimeout(() => {
                navigate("/brands");
            }, 1500);

        } catch (error) {
            console.log(error);
            setToast({
                message: error.response?.data?.message || "Failed to delete brand",
                success: false,
            });
        } finally {
            setLoading(false);
        }
    }

    if (!ok) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
                <BlinkBlur color="#fff200" size="medium" text="BrandInfo Loading..." textColor="#ffffff" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Banner */}

            <div className="relative h-105">

                <img
                    src={banner}
                    alt={name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>

                {/* Logo */}

                <div className="absolute -bottom-16 right-14 flex items-end gap-6">

                    <div className="w-36 h-36 rounded-full bg-white border-4 border-yellow-400 shadow-2xl p-4">

                        <img
                            src={logo}
                            alt={name}
                            className="w-full h-full object-contain"
                        />

                    </div>

                    <div className="pb-5">

                        <h1 className=" text-5xl font-bold">
                            {name}
                        </h1>

                    </div>

                </div>

            </div>

            {/* Brand Details */}

            <div className="max-w-7xl mx-auto px-8 pt-28">

                {toast.message && (
                    <div
                        className={`mb-6 rounded-lg px-4 py-3 font-medium ${toast.success
                            ? "bg-green-500/20 text-green-400 border border-green-500"
                            : "bg-red-500/20 text-red-400 border border-red-500"
                            }`}
                    >
                        {toast.message}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                        <h2 className="text-yellow-400 text-xl font-semibold mb-6">
                            Brand Information
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            <div>
                                <p className="text-zinc-500 text-sm">Founder</p>
                                <p className="text-lg font-semibold">{founder}</p>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-sm">Country</p>
                                <p className="text-lg font-semibold">{country}</p>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-sm">Headquarters</p>
                                <p className="text-lg font-semibold">{headquarters}</p>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-sm">Founded</p>
                                <p className="text-lg font-semibold">{founded}</p>
                            </div>

                            <div className="col-span-2">
                                <p className="text-zinc-500 text-sm">Motto</p>
                                <p className="text-yellow-400 text-xl italic font-semibold">
                                    "{motto}"
                                </p>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-sm">Total Cars</p>
                                <p className="text-lg font-semibold">
                                    {cars.length}
                                </p>
                            </div>

                            <div>
                                <p className="text-zinc-500 text-sm">Created</p>
                                <p className="text-lg font-semibold">
                                    {new Date(created).toLocaleDateString()}
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-5 mt-8">

                            <button
                                onClick={() => navigate(`/update-brand/${brandid}`)}
                                className="cursor-pointer font-semibold hover:bg-cyan-600 transition bg-cyan-500 rounded-xl py-4"
                            >
                                Update Brand
                            </button>

                            <button
                                onClick={() => handleDelete(brandid)}
                                className="cursor-pointer font-semibold hover:bg-red-700 transition bg-red-500 rounded-xl py-4"
                            >
                                {loading ? "Deleting..." : "Delete Brand"}
                            </button>

                        </div>

                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                        <h2 className="text-yellow-400 text-xl font-semibold mb-4">
                            Description
                        </h2>

                        <p className="text-zinc-300 leading-8">
                            {description}
                        </p>

                    </div>

                </div>

                {/* Cars */}

                <div className="mt-16">

                    <h2 className="text-4xl font-bold mb-8">
                        {name} Cars
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {cars.map((car) => (

                            <div
                                onClick={() => navigate(`/car/info/${car._id}`)}
                                key={car._id}
                                className=" cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400 hover:-translate-y-2 transition duration-300 shadow-xl"
                            >

                                <img
                                    src={car.car_image}
                                    alt={car.name}
                                    className="w-full h-64 object-cover"
                                />

                                <div className="p-6">

                                    <div className="flex justify-between items-center">

                                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                                            {car.status}
                                        </span>

                                        <span className="text-yellow-400 font-bold text-lg">
                                            ${car.price.toLocaleString()}
                                        </span>

                                    </div>

                                    <h3 className="text-2xl font-bold mt-5">
                                        {car.name}
                                    </h3>

                                    <p className="text-zinc-400 mt-2">
                                        {car.model}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BrandInfo