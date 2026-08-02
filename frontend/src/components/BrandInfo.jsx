import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BlinkBlur } from 'react-loading-indicators';
import { BASE_URL } from '../config/config';
import { useNavigate, useParams } from 'react-router-dom'

const BrandInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [cars, setCars] = useState([])
  const [ok, setisok] = useState(false);

  useEffect(() => {
    const fetchbrandinfo = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${BASE_URL}/api/brand/brandbyid/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.data.success) {
          setisok(true);
          setBrand(res.data.brand)
          setCars(res.data.cars)
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchbrandinfo();
  }, [id])

  if (!ok) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        <BlinkBlur color="#fff200" size="medium" text="BrandInfo Loading..." textColor="#ffffff" />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= Hero ================= */}

      <div className="relative h-150">

        <img
          src={brand.brand_banner}
          alt={brand.brand_name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/10"></div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center">

          <div className="w-40 h-40 rounded-full bg-white border-4 border-yellow-400 shadow-2xl p-5">

            <img
              src={brand.brand_logo}
              alt={brand.brand_name}
              className="w-full h-full object-contain"
            />

          </div>

        </div>

      </div>

      {/* ================= Content ================= */}

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">

        <div className="text-center">

          <h1 className="text-6xl font-extrabold">
            {brand.brand_name}
          </h1>

          <p className="text-yellow-400 text-2xl italic mt-5">
            "{brand.motto}"
          </p>

        </div>

        {/* ================= Info Cards ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-zinc-500 uppercase text-xs tracking-widest">
              Founder
            </p>

            <h2 className="text-2xl font-bold mt-3">
              {brand.brand_founder}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-zinc-500 uppercase text-xs tracking-widest">
              Country
            </p>

            <h2 className="text-2xl font-bold mt-3">
              {brand.country}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-zinc-500 uppercase text-xs tracking-widest">
              Founded
            </p>

            <h2 className="text-2xl font-bold mt-3">
              {brand.founded}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <p className="text-zinc-500 uppercase text-xs tracking-widest">
              Headquarters
            </p>

            <h2 className="text-xl font-bold mt-3">
              {brand.headquarters}
            </h2>
          </div>

        </div>

        {/* ================= About ================= */}

        <div className="mt-14 bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

          <h2 className="text-4xl font-bold mb-8">
            About {brand.brand_name}
          </h2>

          <p className="text-zinc-300 text-lg leading-9">
            {brand.description}
          </p>

        </div>

        {/* ================= Stats ================= */}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-center">

            <h2 className="text-6xl font-extrabold text-yellow-400">
              {cars.length}
            </h2>

            <p className="text-zinc-400 mt-3">
              Total Cars
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-center">

            <h2 className="text-3xl font-bold">
              {brand.country}
            </h2>

            <p className="text-zinc-400 mt-3">
              Country
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-center">

            <h2 className="text-3xl font-bold">
              {brand.brand_founder}
            </h2>

            <p className="text-zinc-400 mt-3">
              Founder
            </p>

          </div>

        </div> */}

        {/* ================= Cars ================= */}

        <div className="mt-20">

          <h2 className="text-5xl font-bold mb-10">
            {brand.brand_name} Cars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">

            {cars.map((car) => (

              <div
                key={car._id}
                className=" group bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden hover:border-yellow-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10 transition duration-300 flex flex-col"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={car.car_image}
                    alt={car.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <span
                    className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-bold
                  ${car.status === "Available"
                        ? "bg-green-500 text-white"
                        : car.status === "Upcoming"
                          ? "bg-yellow-400 text-black"
                          : "bg-red-600 text-white"
                      }`}
                  >
                    {car.status}
                  </span>

                </div>

                <div className="p-6 flex flex-col flex-1">

                  <h2 className="text-2xl font-bold">
                    {car.name}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {car.model}
                  </p>

                  <div className="mt-5 text-yellow-400 text-2xl font-bold">
                    ${car.price.toLocaleString()}
                  </div>

                  <button
                   onClick={() => navigate(`/car/info/${car._id}`)}
                    className=" cursor-pointer mt-4  w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
                  >
                    View Details
                  </button>

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