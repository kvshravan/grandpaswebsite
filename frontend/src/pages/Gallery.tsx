import React, { useState, useEffect } from 'react';

// Dynamically import all gallery images
const imageModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', { eager: true });
const images = Object.values(imageModules).map((module: any) => module.default);

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Auto-slide every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Photo Gallery</h1>

      {/* Slideshow */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden rounded-lg shadow mb-8 bg-gray-100">
        <button
          onClick={goToPrevious}
          className="absolute left-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 shadow"
        >
          ⬅️
        </button>

        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="max-h-full max-w-full object-contain transition-all duration-500"
        />

        <button
          onClick={goToNext}
          className="absolute right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 shadow"
        >
          ➡️
        </button>
      </div>
      <br></br>
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">All Images</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded shadow">
            <img
              src={src}
              alt={`Gallery Image ${index}`}
              className="w-full h-64 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
