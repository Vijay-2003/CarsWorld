import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const navLinks = [
        { name: "Dashboard", href: "/" },
        { name: "Add Car", href: "/add-car" },
        { name: "Add Brand", href: "/add-brand" },
        { name: "Users", href: "/users" },
        { name: "Brands", href: "/brands" },
        { name: "Cars", href: "/cars" },
    ];

    return (
        <nav className="bg-black border-b border-zinc-800 text-white px-5 md:px-10 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <div onClick={() => navigate("/")} className=" hover:cursor-pointer text-2xl md:text-3xl font-bold tracking-wide">
                    <span className="text-yellow-400">Cars</span>World
                </div>


                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">

                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-yellow-400 transition duration-300 font-medium"
                        >
                            {link.name}
                        </a>
                    ))}


                    {token ? (
                        <button
                            onClick={handleLogout}
                            className=" cursor-pointer bg-yellow-400 text-black px-6 py-2 rounded-lg 
                        font-semibold hover:bg-yellow-300 transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="cursor-pointer bg-yellow-400 text-black px-6 py-2 rounded-lg 
                            font-semibold hover:bg-yellow-300 transition duration-300"
                        >
                            Login
                        </button>
                    )}

                </div>


                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>

            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden mt-5 flex flex-col gap-5 border-t border-zinc-800 pt-5">

                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-yellow-400 transition"
                            onClick={() => setOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}

                    {token ? (
                        <button
                            className="bg-yellow-400 text-black px-6 py-2 rounded-lg 
                        font-semibold hover:bg-yellow-300 transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-yellow-400 text-black px-6 py-2 rounded-lg 
                            font-semibold hover:bg-yellow-300 transition duration-300"
                        >
                            Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar