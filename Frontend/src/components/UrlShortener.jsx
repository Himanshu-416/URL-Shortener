import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const navigate = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post("/api/v1/url", { url })
      .then((res) => {
        console.log(res?.data?.data?.shortId);
        setShortUrl(res?.data?.data?.shortId);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthorized") {
          return navigate("/login");
        }
        console.log(err);
      });
  }

  return (
    <div className="flex items-center mt-10 flex-col">
      <div className="flex w-[60vw] border-2 bg-slate-100 rounded-full items-center gap-2 p-4 relative">
        <i className="fa-solid fa-link"></i>
        <input
          className="bg-transparent outline-none text-lg font-medium w-[80%] block h-full"
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoComplete="off"
          placeholder="Enter your URL"
        />
        <button
          className="bg-blue-500 px-5 py-3 rounded-full text-white font-semibold hover:bg-blue-600 absolute right-2"
          type="submit"
          onClick={(e) => {
            handlesubmit(e);
          }}
        >
          Shorten
        </button>
      </div>
      {shortUrl && (
        <div className="w-[60vw] mt-5">
          <p className="text-xl font-medium">
            Shortened URL: http://localhost:5173/url/{shortUrl}
          </p>
        </div>
      )}
    </div>
  );
}

export default UrlShortener;
