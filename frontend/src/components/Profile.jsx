import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { } from 'lucide-react'
import { BASE_URL } from '../config/config'
import { BlinkBlur } from 'react-loading-indicators'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ok, setisok] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    success: false,
  })

  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(() => {
      setToast({
        message: "",
        success: false
      })
    }, 1000);
    return () => clearTimeout(timer);
  }, [toast.message])

  useEffect(() => {
    const getprofile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${BASE_URL}/api/wishlist/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.data.success) {
          setisok(true)
          setProfile(res.data)
          // console.log(res.data);
        }

      } catch (error) {
        console.log(error.response?.data?.message || error);
      }
    }

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
    getprofile();
    getuserreviews();
  }, [])

  const DeleteWishlist = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`${BASE_URL}/api/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.data.success) {
        setToast({
          message: res.data.message,
          success: true
        })
        setProfile((prev) => ({
          ...prev,
          wishlist: prev.wishlist.filter((car) => car._id !== id),
        }));

      }
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        <BlinkBlur color="#fff200" size="medium" text="Profile Loading..." textColor="#ffffff" />
      </div>
    );
  }

  if (!ok) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        <BlinkBlur color="#fff200" size="medium" text="Profile Loading..." textColor="#ffffff" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-5 py-10 bg-zinc-700">

      {/* ================= Profile ================= */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">

        <img
          src={profile.user.avatar}
          alt={profile.user.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-yellow-400"
        />

        <div className="flex-1 text-center md:text-left">

          <h1 className="text-4xl font-bold text-white">
            {profile.user.name}
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            {profile.user.email}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">

            <div className="bg-black border border-zinc-700 px-6 py-4 rounded-2xl">
              <p className="text-zinc-400 text-sm">
                Wishlist
              </p>

              <h2 className="text-yellow-400 text-2xl font-bold">
                {profile.wishlist.length}
              </h2>
            </div>

            <div className="bg-black border border-zinc-700 px-6 py-4 rounded-2xl">
              <p className="text-zinc-400 text-sm">
                Reviews
              </p>

              <h2 className="text-yellow-400 text-2xl font-bold">
                {reviews.length}
              </h2>
            </div>

          </div>

        </div>

      </div>

      {/* ================= Wishlist ================= */}



      <div className="mt-14">

        <h2 className="text-3xl font-bold text-white mb-8">
          ❤️ My Wishlist
        </h2>

        {toast.message && (
          <div
            className={`mb-6 rounded-xl p-4 text-center font-semibold border ${toast.success
              ? "bg-green-500/20 border-green-500 text-green-400"
              : "bg-red-500/20 border-red-500 text-red-400"
              }`}
          >
            {toast.message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {profile.wishlist.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-3xl py-20 px-8 text-center">

              {/* Icon */}

              <div className="w-24 h-24 rounded-full bg-yellow-400/10 border border-yellow-400 flex items-center justify-center mb-6">
                <span className="text-5xl">❤️</span>
              </div>

              <h2 className="text-3xl font-bold text-white">
                Your Wishlist is Empty
              </h2>

              <p className="text-zinc-400 mt-4 max-w-md leading-7">
                Looks like you haven't added any dream cars yet.
                Start exploring our premium collection and save your
                favourite cars here.
              </p>

              <button
                onClick={() => navigate("/cars")}
                className=" cursor-pointer mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl transition duration-300"
              >
                Explore Cars
              </button>

            </div>
          ) : (
            profile.wishlist.map((car) => (

              <div
                key={car._id}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-400 transition"
              >

                <img
                  src={car.car_image}
                  alt={car.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2">

                      <img
                        src={car.brand.brand_logo}
                        alt={car.brand.brand_name}
                        className="w-full h-full object-contain"
                      />

                    </div>

                    <div>

                      <p className="text-zinc-400 text-sm">
                        Brand
                      </p>

                      <h3 className="text-white font-semibold">
                        {car.brand.brand_name}
                      </h3>

                    </div>

                  </div>

                  <h2 className="text-2xl text-white font-bold mt-5">
                    {car.name}
                  </h2>

                  <button
                    onClick={() => DeleteWishlist(car._id)}
                    className=" cursor-pointer w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
                  >

                    {loading ? "Removing From Wishlist" : "Remove From Wishlist"}
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>

      {/* ================= Reviews ================= */}

      <div className="mt-16">

        <h2 className="text-3xl font-bold text-white mb-8">
          ⭐ My Reviews
        </h2>

        <div className="space-y-8">

          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-3xl py-20 px-8 text-center">

              {/* Icon */}

              <div className="w-24 h-24 rounded-full bg-yellow-400/10 border border-yellow-400 flex items-center justify-center mb-6">
                <span className="text-5xl">⭐</span>
              </div>

              <h2 className="text-3xl font-bold text-white">
                No Reviews Yet
              </h2>

              <p className="text-zinc-400 mt-4 max-w-md leading-7">
                You haven't reviewed any cars yet.
                Share your experience with your favorite cars and help other enthusiasts
                make better decisions.
              </p>

              <button
                onClick={() => navigate("/cars")}
                className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl transition duration-300"
              >
                Explore Cars
              </button>

            </div>
          ) : (
            reviews.map((review) => (

              <div
                key={review._id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col lg:flex-row"
              >

                <img
                  src={review.car.car_image}
                  alt={review.car.name}
                  className="lg:w-80 h-64 object-cover"
                />

                <div className="flex-1 p-8">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-white p-2">

                      <img
                        src={review.car.brand.brand_logo}
                        alt={review.car.brand.brand_name}
                        className="w-full h-full object-contain"
                      />

                    </div>

                    <div>

                      <p className="text-yellow-400">
                        {review.car.brand.brand_name}
                      </p>

                      <h2 className="text-3xl font-bold text-white">
                        {review.car.name}
                      </h2>

                    </div>

                  </div>

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

                  <p className="text-zinc-300 leading-7 mt-6">
                    {review.review}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">

                    <button
                      onClick={() => OpenUpdateModal(review)}
                      className=" cursor-pointer flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-xl transition"
                    >
                      Update Review
                    </button>

                    <button
                      onClick={() => DeleteReview(review._id)}
                      className=" cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
                    >
                      Delete Review
                    </button>

                  </div>

                </div>

              </div>

            ))
          )}

        </div>

      </div>
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
                className="flex-1 cursor-pointer bg-zinc-400 hover:bg-zinc-700 py-3 rounded-xl font-semibold transition"
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
  )
}

export default Profile