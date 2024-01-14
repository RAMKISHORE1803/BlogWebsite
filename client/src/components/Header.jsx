import React, { useContext, useEffect } from "react";
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

  const username = userInfo?.username;

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center w-full top-0 z-10">
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
