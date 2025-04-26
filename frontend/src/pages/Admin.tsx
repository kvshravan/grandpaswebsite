import React, { useState } from 'react';

const AdminUploadPage: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  // Hardcoded password (later move this to backend!)
  const correctPassword = "lhvsadmin";

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleUploadSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (file) {
      formData.append('file', file);
    }

    fetch("/upload_pdf", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => alert("PDF uploaded successfully!"))
      .catch(err => alert("Error uploading PDF"));
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {!authenticated ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center text-indigo-700">Admin Login</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-2 mb-6 border rounded text-black"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center text-indigo-700">Admin - Upload PDF</h1>
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter PDF title"
                            className="w-full p-2 mb-6 border rounded text-black"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
              Upload PDF
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AdminUploadPage;
