import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import useProfile from "../hooks/useProfile";

const LandingPage = () => {
  const { userInfo } = useContext(UserContext);
  const { loading } = useProfile(); // Destructure loading from the custom hook

  if (loading) {
    return null; // or render a loading indicator
  }

  const username = userInfo?.username;

  const testimonials = [
    {
      author: "John Doe",
      content:
        "MyBlogs is an amazing platform to express and share ideas. I love it!",
    },
    {
      author: "Jane Smith",
      content:
        "The community on MyBlogs is so supportive. It's a great place to connect.",
    },
    {
      author: "Alex Johnson",
      content:
        "Creating and managing posts on MyBlogs is straightforward and user-friendly.",
    },
    {
      author: "Sarah Williams",
      content:
        "I've found incredible inspiration and diverse perspectives on MyBlogs. Highly recommend!",
    },
    {
      author: "David Miller",
      content:
        "The features on MyBlogs make it easy to customize and personalize your blogging experience.",
    },
    {
      author: "Emily Davis",
      content:
        "MyBlogs has become my go-to platform for expressing creativity and connecting with like-minded individuals.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      {username && (
        <>
          <h1 className="text-5xl font-bold mb-8 animate__animated animate__fadeIn animate__bounce">
            Hello {username}
          </h1>
          <p className="text-lg mb-12 animate__animated animate__fadeIn animate__pulse">
            Explore, Create, and Share your thoughts with the world!
          </p>
          <Link
            to="/create"
            className="bg-white text-gray-800 px-4 py-2 rounded-full inline-block hover:bg-gray-300 mt-8 mb-7 "
          >
            Create a new post
          </Link>
        </>
      )}

      {!username && (
        <>
          <h1 className="text-5xl font-bold mb-8 animate__animated animate__fadeIn animate__bounce">
            Welcome to MyBlogs
          </h1>
          <p className="text-lg mb-12 animate__animated animate__fadeIn animate__pulse">
            Explore, Create, and Share your thoughts with the world!
          </p>

          <Link
            to="/register"
            className="bg-white text-gray-800 px-4 py-2 rounded-full inline-block hover:bg-gray-300 mt-8 mb-7 "
          >
            Get Started
          </Link>

          <marquee direction="left" className="w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-4 rounded shadow-md mb-4 mx-2 inline-block"
              >
                <p className="text-white text-lg">{testimonial.content}</p>
                <p className="text-white-600 mt-2">- {testimonial.author}</p>
              </div>
            ))}
          </marquee>
        </>
      )}
    </div>
  );
};

export default LandingPage;
