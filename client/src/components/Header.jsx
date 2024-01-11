import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUsername(null);
  }

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center mb-4 fixed w-full top-0 z-10">
      <div>
        <Link to="/" className="text-white text-xl font-bold">
          MyBlogs
        </Link>
      </div>

      <div className="flex space-x-4">
        {username && (
          <>
            <Link
              to="/create"
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              Create new post
            </Link>
            <a
              onClick={logout}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
