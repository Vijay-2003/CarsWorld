import React from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentBrands = ({ brands }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="flex items-center justify-between mb-12">

          <div>
            <p className="uppercase tracking-[4px] text-yellow-400 font-semibold">
              Latest Manufacturers
            </p>

            <h2 className="text-5xl font-black text-white mt-3">
              Recently Added Brands
            </h2>

            <p className="text-zinc-400 mt-3 max-w-2xl">
              Discover the newest automotive brands recently added to CarsWorld.
            </p>
          </div>

        </div>

        {/* Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

          {brands.map((brand) => (

            <div
              key={brand._id}
              className="group rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 transition duration-500 hover:-translate-y-2 hover:border-yellow-400"
            >

              {/* Logo */}

              <div className="relative h-52 flex items-center justify-center bg-linear-to-br from-zinc-800 to-black overflow-hidden">

                <div className="absolute w-44 h-44 rounded-full bg-yellow-400/10 blur-3xl group-hover:bg-yellow-400/20 transition"></div>

                <img
                  src={brand.brand_logo}
                  alt={brand.brand_name}
                  className="relative w-36 h-36 object-contain transition duration-500 group-hover:scale-110"
                />

              </div>

              {/* Content */}

              <div className="p-6 flex flex-col h-56">

                <div>

                  <h2 className="text-2xl font-black text-white min-h-16 leading-tight">
                    {brand.brand_name}
                  </h2>

                  <div className="flex items-center gap-2 mt-4 text-zinc-400">

                    <CalendarDays size={17} />

                    <span>
                      {new Date(brand.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                  </div>

                </div>

                <button
                  onClick={() => navigate(`/brand/info/${brand._id}`)}
                  className="mt-auto cursor-pointer flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition hover:scale-105"
                >
                  Explore Brand
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default RecentBrands;