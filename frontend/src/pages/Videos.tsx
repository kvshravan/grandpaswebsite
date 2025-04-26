import React, { useState, useEffect } from 'react';
import BASE_URL from '../config';

interface Video {
  title: string;
  url: string;
}

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploadEntries, setUploadEntries] = useState<string>("");
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch(`${BASE_URL}/get_videos`)
      .then(response => response.json())
      .then(data => {
        setVideos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  };

  const handleAdminLogin = () => {
    const password = prompt("Enter admin password:");
    if (password === "lhvsadmin") {
      setIsAdmin(true);
    } else if (password !== null) {
      alert("Incorrect password!");
    }
  };

  const handleUpload = (event: React.FormEvent) => {
    event.preventDefault();
    if (!uploadEntries.trim()) {
      alert("Please provide title and links separated by commas.");
      return;
    }

    const lines = uploadEntries.split("\n").map(line => line.trim()).filter(line => line);
    const entries = [];

    for (let line of lines) {
      const parts = line.split(",");
      if (parts.length !== 2) {
        alert(`Invalid format in line: "${line}". Please use exactly one comma to separate title and URL.`);
        return;
      }

      const title = parts[0].trim();
      const url = parts[1].trim();
      if (!title || !url) {
        alert(`Both title and URL are required in line: "${line}"`);
        return;
      }

      entries.push({ title, url });
    }

    setUploading(true);

    fetch(`${BASE_URL}/upload_video_urls`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entries }),
    })
      .then(response => response.json())
      .then(data => {
        alert("Video links uploaded successfully!");
        fetchVideos();
        setUploadEntries("");
      })
      .catch(err => {
        alert("Error uploading video links");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleRemove = (title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    fetch(`${BASE_URL}/delete_video`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then(response => response.json())
      .then(data => {
        alert("Video deleted successfully!");
        fetchVideos();
      })
      .catch(err => {
        alert("Error deleting video");
      });
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const convertToEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);

      if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      }

      if (urlObj.hostname.includes("youtube.com")) {
        const videoId = urlObj.searchParams.get("v");
        const siParam = urlObj.searchParams.get("si");

        if (videoId) {
          let embedUrl = `https://www.youtube.com/embed/${videoId}`;
          if (siParam) {
            embedUrl += `?si=${siParam}`;
          }
          return embedUrl;
        }
      }

      // fallback
      return url;
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
      return url;
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-3xl font-bold text-center text-indigo-700">Videos</h1>
        {!isAdmin && (
          <button
            onClick={handleAdminLogin}
            className="text-sm bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
          >
            Admin Login
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search Videos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-6 border rounded text-black"
      />

      {isAdmin && (
        <form onSubmit={handleUpload} className="space-y-4 mb-8">
          <p className="text-gray-700 text-sm mb-2">
            <strong>Hint:</strong> Enter one entry per line. Format: <br />
            <code>Title, URL</code> <br />
            Example:<br />
            <code>Bhagavad Gita Chapter 1 Video, https://youtube.com/abc123</code><br />
          </p>

          {uploading && (
            <div className="text-center text-blue-500 mb-4 font-semibold">Uploading...</div>
          )}

          <textarea
            value={uploadEntries}
            onChange={(e) => setUploadEntries(e.target.value)}
            placeholder="Enter Title and URL pairs here..."
            className="w-full p-2 mb-6 border rounded text-black"
            rows={8}
          />
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
            Upload Video Links
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Loading Videos...</div>
      ) : (
        <ul className="space-y-6">
          {filteredVideos.map((video, index) => (
            <li key={index} className="flex flex-col gap-2 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2 font-bold">{index + 1}.</span>
                  <span className="text-white-800">{video.title}</span>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleRemove(video.title)}
                    className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setPlayingUrl(video.url)}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Play Here
                </button>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Play on YouTube
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      {playingUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Now Playing</h2>
          <iframe
            width="100%"
            height="400"
            src={convertToEmbedUrl(playingUrl)}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default VideosPage;
