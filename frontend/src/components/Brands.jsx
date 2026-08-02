import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/config'
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
    <div className="min-h-screen bg-black text-white">

      {/* Hero */}

      <div className="border-b border-zinc-800 bg-linear-to-b from-zinc-900 to-black">

        <div className="max-w-7xl mx-auto px-5 py-14">

          <h1 className="text-5xl font-extrabold">
            Discover
            <span className="text-yellow-400"> Brands</span>
          </h1>

          <p className="text-zinc-400 text-lg mt-4 max-w-2xl">
            Explore the world's greatest automotive manufacturers, from luxury
            and performance icons to everyday legends.
          </p>

          {/* Search */}

          <div className="mt-10 max-w-xl">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brand..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4
            text-white placeholder:text-zinc-500
            focus:border-yellow-400 outline-none transition"
            />

          </div>

        </div>

      </div>

      {/* Brands */}

      <div className="max-w-8xl mx-auto px-5 py-14">

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

              <div className="pt-16 pb-6 px-6 flex flex-col flex-1">

                <h2 className="text-2xl font-bold text-white text-center">
                  {d.brand_name}
                </h2>

                <p className="text-yellow-400 italic text-center mt-2">
                  "{d.motto}"
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <div className="text-center flex-1">

                    <p className="text-zinc-500 text-xs uppercase tracking-wider">
                      Founded
                    </p>

                    <h3 className="text-white text-lg font-semibold mt-1">
                      {d.founded}
                    </h3>

                  </div>

                  <div className="w-px h-10 bg-zinc-700"></div>

                  <div className="text-center flex-1">

                    <p className="text-zinc-500 text-xs uppercase tracking-wider">
                      Total Cars
                    </p>

                    <h3 className="text-yellow-400 text-lg font-bold mt-1">
                      {d.totalCars}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Brands