import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Home';
import PdfsPage from './pages/Pdfs';
import VideosPage from './pages/Videos';
import AdminUploadPage from './pages/Admin';
import AudiosPage from './pages/Audios';

export default function App() {
  return (
    <div>
      {/* Navbar across all pages */}
      <nav className="bg-[#111111] shadow-lg text-white p-4 fixed w-full top-0 left-0 z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold hover:bg-indigo-700 px-4 py-1 rounded">
            Home
          </a>
          <div className="space-x-4 hidden sm:flex">
            <Link to="/pdfs" className="hover:bg-indigo-700 px-4 py-2 rounded">
              PDFs
            </Link>
            <Link to="/videos" className="hover:bg-indigo-700 px-4 py-2 rounded">
              Videos
            </Link>
            <Link to="/audios" className="hover:bg-indigo-700 px-4 py-2 rounded">
              Audios
            </Link>
          </div>

        </div>
      </nav>

      {/* Main content with routes */}
      <div className="pt-20"> {/* Add padding to prevent navbar overlap */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pdfs" element={<PdfsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/admin" element={<AdminUploadPage />} />
          <Route path="/audios" element={<AudiosPage />} />
        </Routes>
      </div>
    </div>
  );
}
