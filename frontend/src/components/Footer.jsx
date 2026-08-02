import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { FaFacebook, FaGithub, FaGithubAlt, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 ">

      {/* Top Glow */}

      <div className="h-1 w-full bg-linear-to-r from-yellow-400 via-orange-500 to-red-500" />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-14 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <h2 className="text-4xl font-black text-white">
              Cars<span className="text-yellow-400">World</span>
            </h2>

            <p className="text-zinc-400 mt-6 leading-8">
              Discover the world's finest luxury, sports and exotic cars.
              Browse brands, compare models, read genuine reviews and stay
              updated with the newest automotive releases.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="https://github.com/Vijay-2003/"
                className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-yellow-400 hover:text-black transition flex items-center justify-center"
              >
                <FaGithub color="white" />
              </a>

              <a
                href="https://www.linkedin.com/in/vijay-digambar-kusekar-682235259/"
                className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-yellow-400 hover:text-black transition flex items-center justify-center"
              >
                <FaLinkedin color="blue"/>
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white text-2xl font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-zinc-400">

              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/brands"
                  className="hover:text-yellow-400 transition"
                >
                  Brands
                </Link>
              </li>

              <li>
                <Link
                  to="/cars"
                  className="hover:text-yellow-400 transition"
                >
                  Cars
                </Link>
              </li>

              <li>
                <Link
                  to="/favourites"
                  className="hover:text-yellow-400 transition"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/myreviews"
                  className="hover:text-yellow-400 transition"
                >
                  My Reviews
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-400 transition"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white text-2xl font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-zinc-400">

              <div className="flex gap-4">

                <Mail className="text-yellow-400 mt-1" />

                <span>support@carsworld.com</span>

              </div>

              <div className="flex gap-4">

                <Phone className="text-yellow-400 mt-1" />

                <span>+91 98765 43210</span>

              </div>

              <div className="flex gap-4">

                <MapPin className="text-yellow-400 mt-1" />

                <span>Mumbai, Maharashtra, India</span>

              </div>

            </div>

          </div>

          {/* Contact CTA */}

          <div>

            <h3 className="text-white text-2xl font-bold mb-6">
              Need Help?
            </h3>

            <p className="text-zinc-400 leading-8 mb-8">
              Have questions about CarsWorld, found a bug, or want to suggest a new
              feature? We'd love to hear from you.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full bg-yellow-400
    hover:bg-yellow-300 text-black font-bold py-4 rounded-xl transition
    duration-300 hover:scale-105"
            >
              Contact Us
            </Link>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between">

          <p className="text-zinc-500 text-center md:text-left">
            © {new Date().getFullYear()} CarsWorld. All Rights Reserved.
          </p>

          <div className="flex gap-8 mt-5 md:mt-0 text-zinc-500">

            

            <Link
              to="/contact"
              className="hover:text-yellow-400 transition"
            >
              Contact
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;