import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [isTelugu, setIsTelugu] = useState(true);

  const toggleLanguage = () => {
    setIsTelugu(!isTelugu);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto min-h-screen flex flex-col justify-between">
      <div>
        {/* Language Toggle Button */}
        <div className="flex justify-end mb-4 items-center space-x-2">
          <span className="text-sm font-medium">{isTelugu ? "తెలుగు" : "English"}</span>
          <button
            onClick={toggleLanguage}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              isTelugu ? 'bg-indigo-500' : 'bg-indigo-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                isTelugu ? '' : 'translate-x-6'
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-700">
          {isTelugu ? "శ్రీ.ఉ.వే. శ్రీమాన్ అప్పన్ కందాడై పెరుమాండ్లాచార్యులు గారు" : "Sri K. Perumandla Charyulu Garu"}
        </h1>

        {/* Description */}
        <p className="text-lg leading-7 mb-8">
          {isTelugu ? (
            <>
              శ్రీ అప్పన్ కందాడై పెరుమాండ్లాచార్యులు గారు భారతీయ సనాతన ధర్మాన్ని ప్రజల్లోకి తీసుకువెళ్ళే మహోన్నత కార్యానికి జీవితాన్ని అంకితం చేసిన ఆధ్యాత్మిక ఉపన్యాసకులు.
              భగవద్గీత, రామాయణం, భాగవతం వంటి శ్రేష్ఠ గ్రంథాలను సాధారణ ప్రజల భాషలో అర్థమయ్యేలా ఉపన్యాసాలు ఇచ్చారు.
              ఈ వెబ్‌సైట్ ద్వారా ఆయన ప్రవచనాలు వీడియోలు, ఆడియోలు, పాఠ్యరూపాల్లో అందుబాటులో ఉంటాయి.
            </>
          ) : (
            <>
              Sri K. Perumandla Charyulu Garu dedicated his life to spreading the Indian Sanatana Dharma among the people.
              He delivered spiritual discourses making great texts like Bhagavad Gita, Ramayana, and Bhagavatam understandable in simple language.
              Through this website, his pravachanams are available in video, audio, and textual formats.
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <Link to="/pdfs" className="w-full p-3 bg-indigo-500 text-white text-center rounded hover:bg-indigo-600">
            {isTelugu ? "PDFs చూడండి" : "View PDFs"}
          </Link>
          <Link to="/videos" className="w-full p-3 bg-indigo-500 text-white text-center rounded hover:bg-indigo-600">
            {isTelugu ? "వీడియోలు చూడండి" : "View Videos"}
          </Link>
          <Link to="/audios" className="w-full p-3 bg-indigo-500 text-white text-center rounded hover:bg-indigo-600">
            {isTelugu ? "ఆడియోలు వినండి" : "Listen Audios"}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600 text-sm">
        {isTelugu
          ? "మనస్సారా ❤️ మనవడినుండి"
          : "With love ❤️, from his grandson"}
           {/* Social Links */}
  <div className="flex justify-center gap-4 text-[#aaa]">
    <a
      href="https://github.com/kvshravan"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      GitHub
    </a>
    <a
      href="https://in.linkedin.com/in/kandadishravan"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      LinkedIn
    </a>
</div>
      </footer>
    </div>
  );
}
