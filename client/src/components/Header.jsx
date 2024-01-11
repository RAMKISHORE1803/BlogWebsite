import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center mb-4 fixed w-full top-0 z-10">
      {/* Left side - MyBlogs text */}
      <div>
        <Link to="/" className="text-white text-xl font-bold">
          MyBlogs
        </Link>
      </div>
      {/* Right side - Login and Register links */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="text-white hover:text-gray-300 cursor-pointer"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-white hover:text-gray-300 cursor-pointer"
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
