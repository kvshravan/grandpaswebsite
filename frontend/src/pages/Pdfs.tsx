import React, { useState, useEffect } from 'react';

interface Pdf {
  title: string;
  url: string;
}

const PdfsPage: React.FC = () => {
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploadEntries, setUploadEntries] = useState<string>("");

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = () => {
    fetch("http://localhost:5000/get_pdfs")
      .then(response => response.json())
      .then(data => {
        setPdfs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching PDFs:", error);
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

    fetch("http://localhost:5000/upload_pdf_urls", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entries }),
    })
      .then(response => response.json())
      .then(data => {
        alert("PDF links uploaded successfully!");
        fetchPdfs();
        setUploadEntries("");
      })
      .catch(err => {
        alert("Error uploading PDF links");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleRemove = (title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    fetch("http://localhost:5000/delete_pdf", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then(response => response.json())
      .then(data => {
        alert("PDF deleted successfully!");
        fetchPdfs();
      })
      .catch(err => {
        alert("Error deleting PDF");
      });
  };

  const filteredPdfs = pdfs.filter(pdf =>
    pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-3xl font-bold text-center text-indigo-700">PDFs</h1>
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
        placeholder="Search PDFs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-6 border rounded text-black"
      />

      {isAdmin && (
        <form onSubmit={handleUpload} className="space-y-4 mb-8">
          <p className="text-gray-700 text-sm mb-2">
            <strong>Hint:</strong> Enter one entry per line. Format: <br/>
            <code>Title, URL</code> <br/>
            Example:<br/>
            <code>Bhagavad Gita Chapter 1, https://drive.google.com/abc123</code><br/>
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
            Upload PDF Links
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Loading PDFs...</div>
      ) : (
        <ul className="space-y-4">
          {filteredPdfs.map((pdf, index) => (
            <li key={index} className="flex items-center justify-between">
              <div>
                <span className="mr-2 font-bold">{index + 1}.</span>
                <a
                  href={pdf.url}
                  className="text-indigo-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pdf.title}
                </a>
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleRemove(pdf.title)}
                  className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PdfsPage;
