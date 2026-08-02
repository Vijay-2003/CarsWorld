import React from "react";
import { CalendarDays, Star } from "lucide-react";

const RecentReviews = ({ reviews }) => {
    return (
        <section className="bg-black py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="text-center mb-14">

                    <p className="uppercase tracking-[5px] text-yellow-400 font-semibold">
                        Community Reviews
                    </p>

                    <h2 className="text-5xl font-black text-white mt-3">
                        Latest Reviews
                    </h2>

                    <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
                        See what the CarsWorld community is saying about the latest cars.
                    </p>

                </div>

                {/* Reviews */}

                <div className="grid lg:grid-cols-2 gap-8">

                    {reviews.map((review) => (

                        <div
                            key={review._id}
                            className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden transition duration-500 hover:border-yellow-400 hover:-translate-y-2"
                        >

                            {/* Car */}

                            <div className="relative h-64 overflow-hidden">

                                <img
                                    src={review.car.car_image}
                                    alt={review.car.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                                <div className="absolute bottom-5 left-5">

                                    <h2 className="text-3xl font-black text-white">
                                        {review.car.name}
                                    </h2>

                                </div>

                            </div>

                            {/* Content */}

                            <div className="p-7">

                                {/* User */}

                                <div className="flex items-center gap-4">

                                    <img
                                        src={review.user.avatar}
                                        alt={review.user.name}
                                        className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover"
                                    />

                                    <div>

                                        <h3 className="text-xl font-bold text-white">
                                            {review.user.name}
                                        </h3>

                                        <div className="flex items-center gap-1 mt-1">

                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={18}
                                                    fill="#facc15"
                                                    color="#facc15"
                                                />
                                            ))}

                                            <span className="ml-2 text-zinc-400">
                                                {review.rating}/5
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* Review */}

                                <div className="mt-6 bg-zinc-800 rounded-2xl p-5">

                                    <p className="text-zinc-300 leading-8">
                                        "{review.review}"
                                    </p>

                                </div>

                                {/* Footer */}

                                <div className="mt-6 flex justify-between items-center">

                                    <div className="flex items-center gap-2 text-zinc-400">

                                        <CalendarDays size={18} />

                                        <span>
                                            {new Date(review.createdAt).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
};

export default RecentReviews;