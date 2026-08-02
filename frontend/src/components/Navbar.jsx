import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { NavLink } from "react-router-dom";
import {
  Car,
  Building2,
  User,
  Search,
  LogIn,
  Menu,
  X,
  UserPlus,
  Pen,
  Heart,
  Home,
  Contact,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Cars",
    path: "/cars",
    icon: Car,
  },
  {
    name: "Brands",
    path: "/brands",
    icon: Building2,
  },
  {
    name: "My Reviews",
    path: "/myreviews",
    icon: Pen  
  },
  {
    name: "Favourites",
    path: "/favourites",
    icon: Heart 
  },
  {
    name: "ContactUs",
    path: "/contact",
    icon: Contact
  }

];

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
}

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await axios.get(`${BASE_URL}/api/wishlist/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">

        {/* Logo */}

        <NavLink to="/" className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-yellow-400 flex items-center justify-center">
            <Car size={24} className="text-black" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Cars<span className="text-yellow-400">World</span>
            </h1>

            <p className="text-[10px] tracking-[4px] uppercase text-zinc-500">
              Luxury Garage
            </p>
          </div>

        </NavLink>

        {/* Desktop Links */}

        <div className="hidden lg:flex items-center gap-2">

          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-3 rounded-full transition ${isActive
                    ? "bg-yellow-400 text-black"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-yellow-400"
                  }`
                }
              >
                <Icon size={18} />
                {link.name}
              </NavLink>
            );
          })}

        </div>

        {/* Desktop Right */}

        <div className="hidden lg:flex items-center gap-4">

          {token ? (
            <NavLink
              to="/profile"
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 hover:scale-105 transition"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <User size={22} className="text-yellow-400" />
                </div>
              )}
            </NavLink>
          ) : (

            <NavLink
              to="/signup"
              className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              <UserPlus size={18} />
              Signup
            </NavLink>
          )}

          {token ? (
            <NavLink
              onClick={handleLogout}
              className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              <LogIn size={18} />
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              <LogIn size={18} />
              Login
            </NavLink>
          )}

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-125" : "max-h-0"
          }`}
      >
        <div className="px-5 pb-6 bg-zinc-950 border-t border-zinc-800">

          <div className="flex flex-col gap-3 mt-5">

            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                      ? "bg-yellow-400 text-black"
                      : "text-white hover:bg-zinc-800"
                    }`
                  }
                >
                  <Icon size={20} />
                  {link.name}
                </NavLink>
              );
            })}

          </div>

          <div className="flex gap-3 mt-6">
            {token ? (
              <NavLink
                to="/profile"
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 hover:scale-105 transition"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                    <User size={22} className="text-yellow-400" />
                  </div>
                )}
              </NavLink>
            ) : (

              <NavLink
                to="/signup"
                className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
              >
                <UserPlus size={18} />
                Signup
              </NavLink>
            )}

            {token ? (
              <NavLink
                onClick={handleLogout}
                className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
              >
                <LogIn size={18} />
                Logout
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
              >
                <LogIn size={18} />
                Login
              </NavLink>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;