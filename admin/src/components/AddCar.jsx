import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config/api';
import { Loader2 } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'

const AddCar = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        name: "",
        brand: "",
        model: "",
        price: "",
        description: "",
        launch_year: "",
        body_type: "",
        engine_capacity: "",
        mileage: "",
        top_speed: "",
        seating_capacity: "",
        drive_type: "",
        colors: "",
        safety_features: "",
        status: "Available",
        car_image: null,
        gallery: []
    });

    const [carPreview, setCarPreview] = useState(null);
    const [galleryPreview, setGalleryPreview] = useState([]);

    const [brands, setBrands] = useState([])

    useEffect(() => {
        const fetchbrands = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/brand/allbrands`);
                setBrands(res.data.brands);
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        fetchbrands();
    })

    const [toast, setToast] = useState({
        message: "",
        success: false
    })

    useEffect(() => {
        if (!toast.message) return;

        const timer = setTimeout(() => {
            setToast({
                message: "",
                success: false,
            });
        }, 1500);

        return () => clearTimeout(timer);
    }, [toast.message]);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "car_image") {
            setFormData({
                ...formdata,
                car_image: files[0]
            });

            setCarPreview(URL.createObjectURL(files[0]))
        }
        else if (name === "gallery") {
            const galleryimages = [...files];
            setFormData({
                ...formdata,
                gallery: galleryimages
            });
            setGalleryPreview(
                galleryimages.map((file) => URL.createObjectURL(file))
            )
        }
        else {
            setFormData({
                ...formdata,
                [name]: value
            });
        }
    };

    useEffect(() => {
        if (!id) return;

        const GetCarById = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${BASE_URL}/api/car/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const car = res.data.car;
                // console.log(res.data);
                setFormData({
                    name: car.name,
                    brand: car.brand._id,          // NOT brand_name
                    model: car.model,
                    price: car.price,
                    description: car.description,
                    launch_year: car.launch_year,
                    body_type: car.body_type,
                    engine_capacity: car.engine_capacity,
                    mileage: car.mileage,
                    top_speed: car.top_speed,
                    seating_capacity: car.seating_capacity,
                    drive_type: car.drive_type,
                    colors: car.colors.join(", "),
                    safety_features: car.safety_features.join(", "),
                    status: car.status,
                    car_image: null,
                    gallery: []
                })

                setCarPreview(car.car_image);
                setGalleryPreview(car.gallery);

            } catch (error) {
                console.log(error);
            }
        }
        GetCarById()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        const data = new FormData();

        data.append("name", formdata.name);
        data.append("brand", formdata.brand);
        data.append("model", formdata.model);
        data.append("price", formdata.price);
        data.append("description", formdata.description);
        data.append("launch_year", formdata.launch_year);
        data.append("body_type", formdata.body_type);
        data.append("engine_capacity", formdata.engine_capacity);
        data.append("mileage", formdata.mileage);
        data.append("top_speed", formdata.top_speed);
        data.append("seating_capacity", formdata.seating_capacity);
        data.append("drive_type", formdata.drive_type);
        data.append("colors", formdata.colors);
        data.append("safety_features", formdata.safety_features);
        data.append("status", formdata.status);

        data.append("car_image", formdata.car_image);

        formdata.gallery.forEach((img) => {
            data.append("gallery", img);
        });

        try {
            let res;
            if (id) {
                res = await axios.put(`${BASE_URL}/api/car/${id}`, data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        }
                    }
                )
            } else {
                res = await axios.post(
                    `${BASE_URL}/api/car/addcars`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            if (res.data.success) {
                setToast({
                    message: id ? "Car Update Successfully!" : "Car Added Successfully!",
                    success: true
                });

                // Optional: reset form
                setFormData({
                    name: "",
                    brand: "",
                    model: "",
                    price: "",
                    description: "",
                    launch_year: "",
                    body_type: "",
                    engine_capacity: "",
                    mileage: "",
                    top_speed: "",
                    seating_capacity: "",
                    drive_type: "",
                    colors: "",
                    safety_features: "",
                    status: "Available",
                    car_image: null,
                    gallery: []
                });

                setCarPreview(null);
                setGalleryPreview([]);

                setTimeout(() => {
                    if (id) {
                        navigate(`/car/info/${id}`)
                    } else {
                        navigate(`/cars`)
                    }
                }, 1000);
            }


        } catch (err) {
            setToast({
                message: err.response?.data?.message || "Server Error",
                success: false
            })
        } finally {
            setLoading(false);
        }
    };

    const inputStyle =
        "w-full mt-2 bg-black border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-yellow-400 transition";

    return (
        <div className="min-h-screen bg-black text-white py-10 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="mb-10">
                    <h1 className="text-4xl font-bold">
                        {id ? "Update" : "Add"} <span className="text-yellow-400"> Car</span>
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        {id ? "Update the vehicle information." : "Complete the information below to publish a new vehicle."}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* BASIC */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">

                        <h2 className="text-xl font-semibold mb-6">
                            🚗 Basic Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <input type='text' name="name" value={formdata.name} onChange={handleChange} placeholder='Car Name' required className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition" />

                            <select
                                name="brand"
                                value={formdata.brand}
                                onChange={handleChange}
                                required
                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none"
                            >
                                <option value="" className="bg-zinc-900">
                                    Select Brand
                                </option>

                                {brands.map((brand) => (
                                    <option
                                        key={brand._id}
                                        value={brand._id}
                                        className="bg-zinc-900"
                                    >
                                        {brand.brand_name}
                                    </option>
                                ))}
                            </select>

                            <input type='text' name="model" value={formdata.model} onChange={handleChange} placeholder='Model' className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition" />

                            <input name="price" type="number" value={formdata.price} onChange={handleChange} placeholder='Price' className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition" />

                        </div>

                    </div>

                    {/* SPECIFICATIONS */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">

                        <h2 className="text-xl font-semibold mb-6">
                            ⚙️ Specifications
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                            <input
                                name="launch_year"
                                type="number"
                                value={formdata.launch_year}
                                onChange={handleChange}
                                placeholder="Launch Year"
                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                            />


                            <select
                                name="body_type"
                                value={formdata.body_type}
                                onChange={handleChange}
                                required
                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 outline-none"
                            >
                                <option value="">Select Body Type</option>

                                <option value="SUV">SUV</option>
                                <option value="Compact SUV">Compact SUV</option>
                                <option value="Midsize SUV">Midsize SUV</option>
                                <option value="Full-size SUV">Full-size SUV</option>

                                <option value="Sedan">Sedan</option>
                                <option value="Luxury Sedan">Luxury Sedan</option>

                                <option value="Hatchback">Hatchback</option>

                                <option value="Coupe">Coupe</option>

                                <option value="Convertible">Convertible</option>
                                <option value="Roadster">Roadster</option>

                                <option value="Station Wagon">Station Wagon</option>

                                <option value="Crossover">Crossover</option>

                                <option value="Pickup Truck">Pickup Truck</option>

                                <option value="Minivan">Minivan</option>
                                <option value="Van">Van</option>

                                <option value="MPV">MPV (Multi-Purpose Vehicle)</option>

                                <option value="Sports Car">Sports Car</option>
                                <option value="Supercar">Supercar</option>
                                <option value="Hypercar">Hypercar</option>

                                <option value="Muscle Car">Muscle Car</option>

                                <option value="Off-road">Off-road</option>

                                <option value="Limousine">Limousine</option>

                                <option value="Microcar">Microcar</option>

                                <option value="Fastback">Fastback</option>

                                <option value="Liftback">Liftback</option>

                                <option value="Targa">Targa</option>
                            </select>


                            <input
                                name="engine_capacity"
                                type="number"
                                value={formdata.engine_capacity}
                                onChange={handleChange}
                                placeholder="Engine Capacity (cc)"
                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                            />

                            <input
                                name="mileage"
                                type="number"
                                value={formdata.mileage}
                                onChange={handleChange}
                                placeholder="Mileage"
                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                            />

                            <input
                                name="top_speed"
                                type="number"
                                value={formdata.top_speed}
                                onChange={handleChange}
                                placeholder="Top Speed"
                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                            />

                            <input
                                name="seating_capacity"
                                type="number"
                                value={formdata.seating_capacity}
                                onChange={handleChange}
                                placeholder="Seats"
                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition"
                            />

                            <select
                                name="drive_type"
                                value={formdata.drive_type}
                                onChange={handleChange}
                                required
                                className=" text-white w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none"
                            >
                                <option value="" className="bg-zinc-900">
                                    Select Drive Type
                                </option>
                                <option value="FWD" className="bg-zinc-900">FWD</option>
                                <option value="RWD" className="bg-zinc-900">RWD</option>
                                <option value="AWD" className="bg-zinc-900">AWD</option>
                                <option value="4WD" className="bg-zinc-900">4WD</option>
                            </select>

                            <div>

                                <label>Status</label>

                                <select
                                    name="status"
                                    value={formdata.status}
                                    onChange={handleChange}
                                    className={inputStyle}
                                >

                                    <option value="Available" >Available</option>

                                    <option value="Upcoming" >Upcoming</option>

                                    <option value="Discontinued">Discontinued</option>

                                </select>

                            </div>

                        </div>

                    </div>

                    {/* IMAGES */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">

                        <h2 className="text-xl font-semibold mb-6">
                            🖼 Images
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">

                            <div className=' relative'>
                                <label className="block mb-2">Main Image</label>

                                <label
                                    htmlFor="car_image"
                                    className="flex items-center justify-center h-64 border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer bg-black hover:bg-zinc-900 transition"
                                >
                                    {carPreview ? (
                                        <img
                                            src={carPreview}
                                            alt="Car"
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <span className="text-zinc-400">
                                            Click to Upload Main Image
                                        </span>
                                    )}
                                </label>

                                <input
                                    id="car_image"
                                    type="file"
                                    name="car_image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                />

                                {carPreview && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCarPreview(null);

                                            setFormData({
                                                ...formdata,
                                                car_image: null
                                            });

                                            document.getElementById("car_image").value = "";
                                        }}
                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                )}

                            </div>

                            <div className=' relative'>
                                <label className="block mb-2">Gallery Images</label>

                                <label
                                    htmlFor="gallery"
                                    className="flex items-center justify-center h-64 border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer bg-black hover:bg-zinc-900 transition"
                                >
                                    {galleryPreview.length === 0 ? (
                                        <span className="text-zinc-400">
                                            Click to Upload Gallery Images
                                        </span>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2 p-2 w-full h-full overflow-auto">
                                            {galleryPreview.map((img, index) => (
                                                <div key={index} className="relative">

                                                    <img
                                                        src={img}
                                                        alt=""
                                                        className="h-40 w-full object-cover rounded-lg"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newPreview = galleryPreview.filter(
                                                                (_, i) => i !== index
                                                            );

                                                            const newGallery = formdata.gallery.filter(
                                                                (_, i) => i !== index
                                                            );

                                                            setGalleryPreview(newPreview);

                                                            setFormData({
                                                                ...formdata,
                                                                gallery: newGallery
                                                            });
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 w-8 h-8 rounded-full text-white flex items-center justify-center"
                                                    >
                                                        ✕
                                                    </button>

                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </label>

                                <input
                                    id="gallery"
                                    type="file"
                                    multiple
                                    name="gallery"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                />


                            </div>

                        </div>

                    </div>

                    {/* EXTRA */}

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">

                        <h2 className="text-xl font-semibold mb-6">
                            📄 Additional Details
                        </h2>

                        <div className="space-y-6">

                            <div>

                                <label>Colors</label>

                                <input
                                    type="text"
                                    name="colors"
                                    value={formdata.colors}
                                    onChange={handleChange}
                                    placeholder="Red, White, Black"
                                    className={inputStyle}
                                />

                                <p className="text-sm text-zinc-500 mt-1">
                                    Separate using commas.
                                </p>

                            </div>

                            <div>

                                <label>Safety Features</label>

                                <input
                                    type="text"
                                    name="safety_features"
                                    value={formdata.safety_features}
                                    onChange={handleChange}
                                    placeholder="ABS, Airbags, ESP"
                                    className={inputStyle}
                                />
                                <p className="text-sm text-zinc-500 mt-1">
                                    Separate using commas.
                                </p>

                            </div>

                            <div>

                                <label>Description</label>

                                <textarea
                                    rows={6}
                                    name="description"
                                    value={formdata.description}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />

                            </div>

                        </div>

                    </div>

                    {/* BUTTON */}

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

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold px-10 py-4 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    {id ? "Updating..." : "Adding..."}
                                </>
                            ) : (
                                id ? "Update Car" : "Add Car"
                            )}
                        </button>

                    </div>

                </form>



            </div>

        </div>
    )
}

export default AddCar