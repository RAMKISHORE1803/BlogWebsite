import React from "react";

const Post = () => {
  // Placeholder data for the post
  const post = {
    image: "https://via.placeholder.com/150", // Placeholder image URL
    heading: "Sample Post Heading",
    author: "John Doe",
    time: "January 1, 2022",
    summary:
      "This is a sample post summary. It can contain some information about the post content.",
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg mb-4 flex">
      {/* Left side - Random image */}
      <div className="w-1/3">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Text content */}
      <div className="p-4 w-2/3">
        <h2 className="text-xl font-bold mb-2">{post.heading}</h2>
        <p className="text-sm text-gray-600 mb-2">Author: {post.author}</p>
        <p className="text-sm text-gray-600 mb-2">Time: {post.time}</p>
        <p className="text-gray-800">{post.summary}</p>
      </div>
    </div>
  );
};

export default Post;
