import React, { useContext, useEffect } from "react";
import Post from "../components/Post";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

const IndexPage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]); // Added dependency array

  const username = userInfo?.username;

  return (
    <>
      {username && (
        <>
          <div className="pt-20">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </>
      )}
      {!username && <Navigate to={"/login"} />}
    </>
  );
};

export default IndexPage;
