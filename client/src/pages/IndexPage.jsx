import React, { useContext } from "react";
import Post from "../components/Post";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";

const IndexPage = () => {
  const { userInfo } = useContext(UserContext);
  const { loading } = useProfile(); // Destructure loading from the custom hook

  if (loading) {
    return null; // or render a loading indicator
  }

  const username = userInfo?.username;

  return (
    <>
      {username ? (
        <div className="pt-20">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default IndexPage;
