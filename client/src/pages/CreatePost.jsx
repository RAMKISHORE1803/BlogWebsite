import { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../quillConfig";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const { userInfo } = useContext(UserContext);
  const { loading } = useProfile(); // Destructure loading from the custom hook

  if (loading) {
    return null; // or render a loading indicator
  }

  const username = userInfo?.username;

  const createNewPost = (ev) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    ev.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
    })
      .then(() => {
        // Handle success, if needed
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {username ? (
        <form
          onSubmit={createNewPost}
          className="max-w-md w-full p-6 bg-white rounded-md shadow-md"
        >
          <input
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <textarea
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            placeholder="Summary"
            style={{ maxHeight: "150px", minHeight: "50px" }}
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
          ></textarea>
          <input
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
          />
          <ReactQuill
            value={content}
            onChange={(newValue) => setContent(newValue)}
            modules={modules}
            formats={formats}
            className="mb-4"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Create Post
          </button>
        </form>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default CreatePost;
