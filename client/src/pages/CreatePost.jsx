import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreatePost() {
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

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    ev.preventDefault();
    fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {username && (
        <>
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
        </>
      )}

      {!username && <Navigate to={"/login"} />}
    </div>
  );
}
