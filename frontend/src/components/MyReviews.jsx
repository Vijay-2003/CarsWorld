import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { } from 'lucide-react'
import { BASE_URL } from '../config/config'
import { BlinkBlur } from 'react-loading-indicators'
import { useNavigate } from 'react-router-dom'

const MyReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [ok, setisok] = useState(false);
    const [search, setSearch] = useState("")

    const filterreviews = reviews.filter((r) => {
        const matchcarsearch = r.car.name.toLowerCase().includes(search.toLowerCase());
        const matchbrandsearch = r.car.brand.brand_name.toLowerCase().includes(search.toLowerCase());
        return matchbrandsearch || matchcarsearch;
    })

    // get user reviews
    useEffect(() => {
        const getuserreviews = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${BASE_URL}/api/review/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    setisok(true);
                    setReviews(res.data.reviews);
                    // console.log(res.data);
                }
            } catch (error) {
                console.log(error.response?.data?.message || error);
            }
        }
        getuserreviews();
    }, []);

    const [updateModel, setUpdateModel] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const [editReviewData, setEditReviewData] = useState({
        rating: 5,
        review: ""
    })

    // update review
    const OpenUpdateModal = (review) => {
        setSelectedReview(review._id);
        setEditReviewData({
            rating: review.rating,
            review: review.review
        })
        setUpdateModel(true);
    }

    const UpdateReview = async () => {
        const token = localStorage.getItem("token");

        try {

            const res = await axios.put(
                `${BASE_URL}/api/review/${selectedReview}`,
                editReviewData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {

                setReviews((prev) =>
                    prev.map((review) =>
                        review._id === selectedReview
                            ? {
                                ...review,
                                rating: editReviewData.rating,
                                review: editReviewData.review,
                            }
                            : review
                    )
                );
                setSelectedReview(null);

                setEditReviewData({
                    rating: 5,
                    review: ""
                });

                setUpdateModel(false);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // delete review
    const DeleteReview = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.delete(`${BASE_URL}/api/review/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.success) {
                setReviews((prev) => prev.filter(review => review._id != id))
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (!ok) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
                <BlinkBlur color="#fff200" size="medium" text="Profile Loading..." textColor="#ffffff" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Hero */}

            <section className="border-b border-zinc-800 bg-linear-to-b from-zinc-900 via-black to-black">

                <div className="max-w-7xl mx-auto px-6 py-14">

                    <h1 className="text-5xl font-black">
                        My <span className="text-yellow-400">Reviews</span>
                    </h1>

                    <p className="mt-4 text-zinc-400 text-lg max-w-2xl">
                        Manage every review you've shared with the CarsWorld community.
                    </p>

                    <div className="mt-10 max-w-xl">

                        <input
                            type="text"
                            placeholder="Search by car or brand..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4
                            text-white placeholder:text-zinc-500
                            focus:border-yellow-400 outline-none transition"
                        />

                    </div>

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-6 py-12">

                {filterreviews.length === 0 ? (

                    search ? (

                        <div className="flex flex-col items-center justify-center py-28">

                            <div className="text-7xl">🔍</div>

                            <h2 className="text-4xl font-bold mt-6">
                                No Matching Reviews
                            </h2>

                            <p className="text-zinc-500 mt-4">
                                We couldn't find any reviews matching "{search}".
                            </p>

                        </div>

                    ) : reviews.length === 0 ? (

                        <div className="flex flex-col items-center justify-center py-32">

                            <div className="w-32 h-32 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-6xl">
                                ⭐
                            </div>

                            <h2 className="text-4xl font-bold mt-8">
                                No Reviews Yet
                            </h2>

                            <p className="text-zinc-500 mt-4 max-w-xl text-center">
                                You haven't reviewed any cars yet.
                                Explore cars and let everyone know what you think.
                            </p>

                            <button
                                onClick={() => navigate("/cars")}
                                className="mt-8 cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl transition"
                            >
                                Explore Cars
                            </button>

                        </div>

                    ) : null

                ) : (

                    <div className="space-y-8">

                        {filterreviews.map((review) => (

                            <div
                                key={review._id}
                                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col lg:flex-row hover:border-yellow-400 transition"
                            >

                                {/* Car Image */}

                                <div className="relative lg:w-96">

                                    <img
                                        src={review.car.car_image}
                                        alt={review.car.name}
                                        className="w-full h-72 lg:h-full object-cover"
                                    />

                                    <div className="absolute top-5 left-5 bg-white rounded-full p-2">

                                        <img
                                            src={review.car.brand.brand_logo}
                                            alt={review.car.brand.brand_name}
                                            className="w-10 h-10 object-contain"
                                        />

                                    </div>

                                </div>

                                {/* Content */}

                                <div className="flex-1 p-8 flex flex-col">

                                    <p className="text-yellow-400 uppercase tracking-widest text-sm">
                                        {review.car.brand.brand_name}
                                    </p>

                                    <h2 className="text-4xl font-bold mt-2">
                                        {review.car.name}
                                    </h2>


                                    <p className="text-zinc-500 mt-1">
                                        {review.car.model}
                                    </p>

                                    <div className="mt-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-yellow-400 text-2xl">
                                                {"⭐".repeat(review.rating)}
                                            </span>

                                            <span className="text-zinc-400">
                                                {review.rating}/5
                                            </span>
                                        </div>

                                        <p className="text-sm text-zinc-500 mt-2">
                                            {new Date(review.createdAt).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </p>
                                    </div>

                                    <div className="mt-6 bg-zinc-800 rounded-2xl p-6">

                                        <p className="text-zinc-300 leading-8">
                                            {review.review}
                                        </p>

                                    </div>

                                    <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4">

                                        <button
                                            onClick={() => OpenUpdateModal(review)}
                                            className="cursor-pointer flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
                                        >
                                            Update Review
                                        </button>

                                        <button
                                            onClick={() => DeleteReview(review._id)}
                                            className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition"
                                        >
                                            Delete Review
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

            {updateModel && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5">

                    <div className="w-full max-w-xl bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden">

                        {/* Header */}

                        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">

                            <div>

                                <h2 className="text-3xl font-bold text-white">
                                    Update <span className="text-yellow-400">Review</span>
                                </h2>

                                <p className="text-zinc-500 mt-1">
                                    Edit your rating and review.
                                </p>

                            </div>

                            <button
                                onClick={() => setUpdateModel(false)}
                                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-600 transition flex items-center justify-center text-xl"
                            >
                                ✕
                            </button>

                        </div>

                        {/* Body */}

                        <div className="p-8 space-y-7">

                            {/* Rating */}

                            <div>

                                <label className="block text-zinc-300 mb-3 font-medium">
                                    Rating
                                </label>

                                <select
                                    value={editReviewData.rating}
                                    onChange={(e) =>
                                        setEditReviewData({
                                            ...editReviewData,
                                            rating: Number(e.target.value)
                                        })
                                    }
                                    className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-3 text-white outline-none focus:border-yellow-400"
                                >
                                    <option value="">Select Rating</option>
                                    <option value={1}>⭐ 1</option>
                                    <option value={2}>⭐⭐ 2</option>
                                    <option value={3}>⭐⭐⭐ 3</option>
                                    <option value={4}>⭐⭐⭐⭐ 4</option>
                                    <option value={5}>⭐⭐⭐⭐⭐ 5</option>
                                </select>

                            </div>

                            {/* Review */}

                            <div>

                                <label className="block text-zinc-300 mb-3 font-medium">
                                    Review
                                </label>

                                <textarea
                                    value={editReviewData.review}
                                    onChange={(e) => setEditReviewData({
                                        ...editReviewData,
                                        review: e.target.value
                                    })}
                                    rows={6}
                                    placeholder="Write your updated review..."
                                    className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white resize-none outline-none focus:border-yellow-400"
                                />

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="flex gap-4 px-8 py-6 border-t border-zinc-800">

                            <button
                                onClick={() => setUpdateModel(false)}
                                className="flex-1 cursor-pointer bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl font-semibold transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={UpdateReview}
                                className="flex-1 cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
                            >
                                Update Review
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default MyReviews