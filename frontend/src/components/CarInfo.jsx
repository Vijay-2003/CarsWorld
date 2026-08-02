import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config/config'
import axios from 'axios'
import { BlinkBlur } from 'react-loading-indicators'

const CarInfo = () => {

  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([])
  const [ok, setisok] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const GetCarById = async () => {

      try {
        const res = await axios.get(`${BASE_URL}/api/car/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (res.data.success) {
          setisok(true);
          // console.log(res.data)
          setCar(res.data.car);
        }

      } catch (error) {
        console.log(error);
      }
    }

    const GetCarReviews = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/review/carreview/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (res.data.success) {
          setisok(true)
          console.log(res.data)
          setReviews(res.data.reviews);
        }

      } catch (error) {
        console.log(error);
      }
    }

    GetCarById();
    GetCarReviews();
  }, [id])

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    success: false
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({
        message: "",
        success: false
      })
      return () => clearTimeout(timer);
    }, 1000);
  }, [toast.message])

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    review: "",
  });
  const AddReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${BASE_URL}/api/review/${id}`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setToast({
        message: res.data.message,
        success: true,
      });

      // Add the new review immediately
      setReviews((prev) => [...prev, res.data.userreview]);

      setShowReviewModal(false);

      setReviewData({
        rating: 5,
        review: "",
      });

    } catch (error) {
      console.log(error);
      setToast({
        message: error.response?.data?.message || "Server Error",
        success: false
      })
    } finally {
      setLoading(false);
    }
  }

  const AddWishlist = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${BASE_URL}/api/wishlist/favourite/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.data.success) {
        setToast({
          message: res.data.message,
          success: true
        })
      }
    } catch (error) {
      console.log(error);
      setToast({
        message: error.response?.data?.message,
        success: false
      })
    } finally {
      setLoading(false);
    }
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        <BlinkBlur color="#fff200" size="medium" text="CarInfo Loading..." textColor="#ffffff" />
      </div>
    );
  }

  if (!ok) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        <BlinkBlur color="#fff200" size="medium" text="CarInfo Loading..." textColor="#ffffff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero */}

      <div className="relative h-[70vh] overflow-hidden">

        <img
          src={car.car_image}
          alt={car.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-10 left-10">

          <div className="flex items-center gap-4">

            <div className="w-20 h-20 rounded-full bg-white p-3 border-4 border-yellow-400">
              <img
                src={car.brand.brand_logo}
                alt={car.brand.brand_name}
                className="w-full h-full object-contain"
              />
            </div>

            <div>

              <p className="text-yellow-400 uppercase tracking-widest">
                {car.brand.brand_name}
              </p>

              <h1 className="text-5xl font-bold">
                {car.name}
              </h1>

            </div>

          </div>

        </div>

      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="lg:col-span-2">

            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">

              <h2 className="text-3xl font-bold">
                Description
              </h2>

              <p className="mt-6 text-zinc-300 leading-8">
                {car.description}
              </p>

            </div>

            {/* Gallery */}

            <div className="mt-10">

              <h2 className="text-3xl font-bold mb-6">
                Gallery
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                {car.gallery.map((image, index) => (

                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="rounded-2xl h-56 w-full object-cover hover:scale-105 transition"
                  />

                ))}

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-7 sticky top-28">

              <div className="flex justify-between">

                <div>

                  <p className="text-zinc-500">
                    Price
                  </p>

                  <h2 className="text-4xl font-bold text-yellow-400">
                    ${car.price.toLocaleString()}
                  </h2>

                </div>

                <span
                  className={`px-5 h-fit py-2 rounded-full font-semibold
              ${car.status === "Available"
                      ? "bg-green-600"
                      : car.status === "Upcoming"
                        ? "bg-yellow-400 text-black"
                        : "bg-red-600"
                    }`}
                >
                  {car.status}
                </span>

              </div>

              <div className="space-y-5 mt-8">

                <div className="flex justify-between">
                  <span className="text-zinc-500">Model</span>
                  <span>{car.model}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Launch Year</span>
                  <span>{car.launch_year}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Body Type</span>
                  <span>{car.body_type}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Engine</span>
                  <span>{car.engine_capacity === 0 ? "Electric" : (car.engine_capacity)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Mileage</span>
                  <span>{car.mileage}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Top Speed</span>
                  <span>{car.top_speed}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Seats</span>
                  <span>{car.seating_capacity}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Drive Type</span>
                  <span>{car.drive_type}</span>
                </div>

              </div>

              {/* Wishlist Button */}

              {toast.message && (
                <div
                  className={` mt-4 p-2 rounded-xl text-center border ${toast.success
                    ? "bg-green-500/20 border-green-500 text-green-400"
                    : "bg-red-500/20 border-red-500 text-red-400"
                    }`}
                >
                  {toast.message}
                </div>
              )}

              <button
                type='button'
                onClick={AddWishlist}
                className=" cursor-pointer w-full mt-4 bg-yellow-400 hover:bg-yellow-300
                 text-black font-bold py-4 rounded-2xl
                transition duration-300 hover:scale-[1.02]
                active:scale-95 flex items-center justify-center gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 19.071l6.879-6.879 6.879 6.879M12 12V3"
                  />
                </svg>

                Add to Wishlist
              </button>

              {/* Colors */}

              <div className="mt-10">

                <h3 className="font-bold text-xl mb-4">
                  Colors
                </h3>

                <div className="flex flex-wrap gap-3">

                  {car.colors.map((color, i) => (

                    <span
                      key={i}
                      className="px-4 py-2 bg-zinc-800 rounded-full"
                    >
                      {color}
                    </span>

                  ))}

                </div>

              </div>

              {/* Safety */}

              <div className="mt-10">

                <h3 className="font-bold text-xl mb-4">
                  Safety Features
                </h3>

                <div className="flex flex-wrap gap-3">

                  {car.safety_features.map((item, i) => (

                    <span
                      key={i}
                      className="px-4 py-2 bg-zinc-800 rounded-full"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Reviews */}

        <div className="mt-20">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-bold">
              User Reviews
            </h2>

            <button
              onClick={() => setShowReviewModal(true)}
              className=" cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl transition"
            >
              Add Review
            </button>

          </div>

          <div className="space-y-6">

            {reviews.map((review) => (

              <div
                key={review._id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                  />

                  <div>
                    <h3 className="text-xl font-bold">
                      {review.user.name}
                    </h3>

                    <p className="text-yellow-400">
                      {"⭐".repeat(review.rating)}
                      <span className="text-zinc-400 ml-2">
                        {review.rating}/5
                      </span>
                    </p>

                    <p className="text-sm text-zinc-500 mt-1">
                      {new Date(review.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      {/* {new Date(review.createdAt).toLocaleDateString("en-GB")} •{" "}
                      {new Date(review.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })} */}
                    </p>
                  </div>

                </div>

                <p className="text-zinc-300 mt-5 leading-8">
                  {review.review}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <form
            onSubmit={AddReview}
            className="bg-zinc-900 w-full max-w-lg rounded-3xl border border-zinc-700 p-8"
          >
            <h2 className=" text-3xl font-bold mb-6">
              Add Review
            </h2>

            {/* Rating */}

            <label className="block mb-2 text-zinc-300">
              Rating
            </label>

            <select
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({
                  ...reviewData,
                  rating: Number(e.target.value),
                })
              }
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 mb-6"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>

            {/* Review */}

            <label className="block mb-2 text-zinc-300">
              Review
            </label>

            <textarea
              rows={6}
              value={reviewData.review}
              onChange={(e) =>
                setReviewData({
                  ...reviewData,
                  review: e.target.value,
                })
              }
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 resize-none"
              placeholder="Share your experience..."
            />

            {toast.message && (
              <div
                className={`mb-6 p-3 rounded-xl text-center border ${toast.success
                  ? "bg-green-500/20 border-green-500 text-green-400"
                  : "bg-red-500/20 border-red-500 text-red-400"
                  }`}
              >
                {toast.message}
              </div>
            )}

            <div className="flex gap-4 mt-8">

              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className=" cursor-pointer flex-1 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer flex-1 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300"
              >
                {loading ? "Posting..." : "Submit Review"}
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  )
}

export default CarInfo