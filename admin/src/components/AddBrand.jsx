import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../config/api';
import { Cross, Crosshair, CrossIcon, ImagePlus, Loader2, LucideCross, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const AddBrand = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand_name: "",
    description: "",
    brand_founder: "",
    country: "",
    headquarters: "",
    founded: "",
    motto: "",
    brand_logo: null,
    brand_banner: null,
  });

  const [toast, setToast] = useState({
    message: "",
    success: false
  })

  const [logopreview, setLogoPreview] = useState(false);
  const [bannerpreview, setBannerPreview] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      setToast({
        message: "",
        success: false,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast.message]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "brand_logo") {
      setFormData({
        ...formData,
        brand_logo: files[0],
      })
      setLogoPreview(URL.createObjectURL(files[0]))
    } else if (name === "brand_banner") {
      setFormData({
        ...formData,
        brand_banner: files[0],
      })
      setBannerPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }

  useEffect(() => {
    if (!id) return;
    const fetchbrandinfo = async () => {

      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${BASE_URL}/api/brand/brandbyid/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const b = res.data.brand;
        // console.log(b);
        setFormData({
          brand_name: b.brand_name,
          description: b.description,
          brand_founder: b.brand_founder,
          country: b.country,
          headquarters: b.headquarters,
          founded: b.founded,
          motto: b.motto,
          brand_logo: null,
          brand_banner: null,
        })

        setLogoPreview(b.brand_logo)
        setBannerPreview(b.brand_banner)

      } catch (error) {
        console.log(error);
      }
    }
    fetchbrandinfo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const data = new FormData();

    data.append("brand_name", formData.brand_name)
    data.append("brand_founder", formData.brand_founder)
    data.append("country", formData.country);
    data.append("headquarters", formData.headquarters);
    data.append("founded", formData.founded);
    data.append("motto", formData.motto);
    data.append("brand_logo", formData.brand_logo)
    data.append("brand_banner", formData.brand_banner)
    data.append("description", formData.description)

    try {

      let res;
      if (id) {
        res = await axios.put(`${BASE_URL}/api/brand/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })

      } else {
        res = await axios.post(`${BASE_URL}/api/brand/addbrand`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
      }

      if (res.data.success) {
        setToast({
          message: id ? "Brand Updated" : "Brand Added",
          success: true
        })

        setFormData({
          brand_name: "",
          description: "",
          brand_founder: "",
          country: "",
          headquarters: "",
          founded: "",
          motto: "",
          brand_logo: null,
          brand_banner: null,
        })

        setBannerPreview(null);
        setLogoPreview(null);

        setTimeout(() => {
          if (id) {
            navigate(`/brand/info/${id}`)
          } else {
            navigate(`/brands`)
          }
        }, 1000);
      }

    } catch (error) {
      console.error(error);
      setToast({
        message: error.response?.data?.message || "Server Error",
        success: false
      })
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className=" w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">

        {/* Heading */}

        <h1 className="text-3xl font-bold text-white mb-2">
          {id ? "Update " : "Add "}<span className="text-yellow-400">Brand</span>
        </h1>

        <p className="text-zinc-400 mb-8">
          {id ? "Update your brand information." : "Add a new car brand to your collection."}
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Brand Name */}

          <div className=' grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className="block text-gray-300 mb-2">
                Brand Name
              </label>

              <input
                type="text"
                name='brand_name'
                value={formData.brand_name}
                onChange={handleChange}
                placeholder="Enter Brand Name"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            {/* Founder */}

            <div>
              <label className="block text-gray-300 mb-2">
                Founder
              </label>

              <input
                type="text"
                name='brand_founder'
                value={formData.brand_founder}
                onChange={handleChange}
                placeholder="Enter Founder Name"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
          </div>

          {/* Country, Headquarters */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-gray-300 mb-2">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Headquarters
              </label>

              <input
                type="text"
                name="headquarters"
                value={formData.headquarters}
                onChange={handleChange}
                placeholder="Enter Headquarters"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

          </div>

          {/* Founded, Motto */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-gray-300 mb-2">
                Founded
              </label>

              <input
                type="text"
                name="founded"
                value={formData.founded}
                onChange={handleChange}
                placeholder="e.g. 1909"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Motto
              </label>

              <input
                type="text"
                name="motto"
                value={formData.motto}
                onChange={handleChange}
                placeholder="Enter Brand Motto"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

          </div>

          {/* Description */}

          <div>
            <label className="block text-gray-300 mb-2">
              Description
            </label>

            <textarea
              rows={5}
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Brand Description"
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 resize-none focus:outline-none focus:border-yellow-400 transition"
            ></textarea>
          </div>

          {/* Logo */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className=' relative'>
              <label className="block text-gray-300 mb-2">
                Brand Logo
              </label>

              <label htmlFor='brand_logo' className="flex items-center justify-center h-64 border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer bg-black hover:bg-zinc-900 transition">

                {
                  logopreview ? (
                    <img
                      src={logopreview}
                      alt='Logo'
                      className=' w-full h-full object-cover rounded-xl'
                    />
                  ) : (
                    <span className="text-zinc-400">
                      <ImagePlus size={40} className="text-yellow-400 mb-3" />

                      <p className="text-white font-semibold">
                        Upload Brand Logo
                      </p>

                      <p className="text-zinc-500 text-sm">
                        PNG, JPG or WEBP
                      </p>
                    </span>
                  )
                }
              </label>

              <input
                id='brand_logo'
                type="file"
                name='brand_logo'
                accept='image/*'
                onChange={handleChange}
                className="hidden"
              />
              {logopreview && (
                <button
                  type="button"
                  onClick={() => {
                    setLogoPreview(null);

                    setFormData({
                      ...formData,
                      brand_logo: null
                    });

                    document.getElementById("brand_logo").value = "";
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition"
                >
                  <X />
                </button>
              )}
            </div>

            {/* Banner */}

            <div className='relative'>
              <label className="block text-gray-300 mb-2">
                Brand Banner
              </label>

              <label htmlFor='brand_banner' className="flex items-center justify-center h-64 border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer bg-black hover:bg-zinc-900 transition">

                {
                  bannerpreview ? (
                    <img
                      src={bannerpreview}
                      alt='Banner'
                      className=' w-full h-full object-cover rounded-xl'
                    />
                  ) : (
                    <span className="text-zinc-400">
                      <ImagePlus size={40} className="text-yellow-400 mb-3" />

                      <p className="text-white font-semibold">
                        Upload Brand Banner Image
                      </p>

                      <p className="text-zinc-500 text-sm">
                        PNG, JPG or WEBP
                      </p>
                    </span>
                  )
                }
              </label>

              <input
                id='brand_banner'
                type="file"
                accept='image/*'
                name='brand_banner'
                onChange={handleChange}
                className="hidden"
              />

              {
                bannerpreview && (
                  <button
                    type='button'
                    onClick={() => {
                      setBannerPreview(null);

                      setFormData({
                        ...formData,
                        brand_banner: null
                      })

                      document.getElementById("brand_banner").value = ""

                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition"
                  >
                    <X />
                  </button>
                )
              }

            </div>
          </div>

          {/* Buttons */}

          <div className="flex flex-col gap-4 pt-4">

            {toast.message && (
              <div
                className={`w-full rounded-xl py-4 px-5 text-center font-medium border ${toast.success
                  ? "bg-green-500/20 border-green-500 text-green-400"
                  : "bg-red-500/20 border-red-500 text-red-400"
                  }`}
              >
                {toast.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl transition"
            >
              {loading ? (
                <>
                  {id ? "Updating..." : "Adding..."}
                  <Loader2 className='animate-spin' /></>
              ) : (
                id ? "Update Brand" : "Add Brand"
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddBrand