import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username; //optional chaining operator
  //checking if the userInfo object is defined and not null or undefined. If userInfo is defined, it then attempts to access the username property of userInfo. However, if userInfo is null or undefined, the expression short-circuits, and username is assigned undefined

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
