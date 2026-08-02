import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config/config';
import { BlinkBlur } from 'react-loading-indicators'
import { useNavigate } from 'react-router-dom'

const Cars = () => {

  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [ok, setisok] = useState(false);

  const filtercars = cars.filter((car) => {
    const matchsearch = car.name.toLowerCase().includes(search.toLowerCase());
    return matchsearch;
  })

  useEffect(() => {
    const fetchcars = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/car/allcars`);
        if (res.data.success) {
          setisok(true);
          // console.log(res.data);
          setCars(res.data.cars);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchcars();
  }, [])

  if (!ok) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        <BlinkBlur color="#fff200" size="medium" text="Cars Loading..." textColor="#ffffff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero */}

      <div className="relative border-b border-zinc-800 bg-linear-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-5 py-14">

          <h1 className="text-5xl font-extrabold">
            Explore
            <span className="text-yellow-400"> Cars</span>
          </h1>

          <p className="text-zinc-400 mt-4 text-lg max-w-2xl">
            Browse premium sports cars, luxury sedans, SUVs and hypercars from
            the world's greatest manufacturers.
          </p>

          {/* Search */}

          <div className="mt-10 relative max-w-xl">

            <input
              type="text"
              placeholder="Search your dream car..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl pl-6 pr-6 py-4 text-white placeholder:text-zinc-500 focus:border-yellow-400 outline-none transition"
            />

          </div>

        </div>
      </div>

      {/* Cars */}

      <div className="max-w-7xl mx-auto px-5 py-12">

        <div className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-8">

          {filtercars.map((car) => (

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

    </div>
  );
}

export default Cars