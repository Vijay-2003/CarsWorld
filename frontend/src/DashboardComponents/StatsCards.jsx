import React from "react";
import {
  Users,
  Car,
  Building2,
  Star,
  CheckCircle2,
  Clock3,
  Ban,
} from "lucide-react";

const StatsCards = ({ data }) => {
  const stats = [
    {
      title: "Total Users",
      value: data.total.users,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Brands",
      value: data.total.brands,
      icon: Building2,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Cars",
      value: data.total.cars,
      icon: Car,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Reviews",
      value: data.total.reviews,
      icon: Star,
      color: "from-amber-400 to-yellow-500",
    },
    {
      title: "Available Cars",
      value: data.carsByStatus.available,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Upcoming Cars",
      value: data.carsByStatus.upcoming,
      icon: Clock3,
      color: "from-red-500 to-orange-500",
    },
     {
    title: "Discontinued Cars",
    value: data.carsByStatus.discontinued,
    icon: Ban,
    color: "from-zinc-500 to-zinc-700",
  },
  ];

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="uppercase tracking-[5px] text-yellow-400 font-semibold">
            Dashboard Overview
          </p>

          <h2 className="text-5xl font-black text-white mt-3">
            CarsWorld Statistics
          </h2>

          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            A quick overview of the latest platform activity, cars, brands,
            users and reviews.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl
                border border-zinc-800 bg-zinc-900
                p-8 transition duration-500
                hover:-translate-y-3
                hover:border-yellow-400"
              >

                {/* Background Glow */}

                <div
                  className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-linear-to-br ${item.color} opacity-20 blur-3xl group-hover:opacity-40 transition`}
                />

                <div className="relative flex justify-between items-start">

                  <div>

                    <p className="text-zinc-400 text-sm uppercase tracking-wider">
                      {item.title}
                    </p>

                    <h2 className="text-5xl font-black mt-5 text-white">
                      {item.value}
                    </h2>

                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${item.color}
                    flex items-center justify-center shadow-xl`}
                  >
                    <Icon className="text-white" size={30} />
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCards;