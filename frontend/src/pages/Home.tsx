import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bw2.webp'; // ✅ Import image

export default function HomePage() {
  const [isTelugu, setIsTelugu] = useState(true);

  const toggleLanguage = () => {
    setIsTelugu(!isTelugu);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto min-h-screen flex flex-col justify-between">
      <div>        <h3 className="text-1xl font-bold mb-4 text-center text-indigo-700">
        శ్రీమతే నారాయణాయ నమః
      </h3>
        {/* Logo Image */}
        <div className="flex justify-center mb-6">

          <img
            src={backgroundImage}
            alt="Logo"
            className="h-14 object-contain" // adjust h-40 as needed
          />

        </div>
        <h3 className="text-1xl font-bold mb-4 text-center text-indigo-700">

          శ్రీమతే రామానుజాయ నమః

        </h3>
        {/* Language Toggle Button */}
        <div className="flex justify-end mb-4 items-center space-x-2">
          <span className="text-sm font-medium">తెలుగు </span>
          <button
            onClick={toggleLanguage}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isTelugu ? 'bg-indigo-500' : 'bg-indigo-300'
              }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isTelugu ? '' : 'translate-x-6'
                }`}
            />
          </button>
          <span className="text-sm font-medium">English</span>
        </div>

        <br></br>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-center text-yellow-700">
          {isTelugu ? "శ్రీ లక్ష్మీ హయవదన సదనం వెబ్ పేజ్ కి స్వాగతం" : "Welcome to Sri Lakshmi Hayavadana Sadanam web page"}
        </h1>

        {/* Description */}
        <p className="text-lg leading-7 mb-8">
          {isTelugu ? (
            <>
              శ్రీమదుభయ వేదాంత ప్రవర్తకాచార్యులు ఉభయ వేదాంత శిరోమణి, విశిష్టాద్వైత వేదాంత విశారద
              శ్రీమాన్ అప్పన్ కందాడై పెరుమాండ్లాచార్యులు గారు భారతీయ సనాతన ధర్మాన్ని
              ముఖ్యంగా శ్రీవైష్ణవ సంప్రదాయాన్ని ప్రజల్లోకి తీసుకువెళ్ళే మహోన్నత కార్యానికి జీవితాన్ని అంకితం చేసిన ఆధ్యాత్మిక ఉపన్యాసకులు.
              భగవద్గీత, రామాయణం, భాగవతం, ముముక్షుప్పడి, శ్రీభాష్యం, భగవద్విషయము, శ్రీవచనభూషణము, ఆచార్య హృదయము వంటి అనేక సంప్రదాయ గ్రంథాలను సేవించి, ఆసక్తికల అనేకమందికి కాలక్షేపములు సాయించుచున్నారు.
              <br></br><br></br>
              అనేక పరిశోధన గ్రంథాలు, అనువాద గ్రంథాలు, స్తోత్రగ్రంథాలు, విమర్శన గ్రంథాలు, సాంప్రదాయ గ్రంథాలు రచించడమేకాక తానే స్వయంగా వాటిని తెలుగులో డిటిపి చేసి స్వంత ఖర్చులతో ముద్రణ చేసి అందరికీ అందుబాటులో ఉంచి ఉపయోగపడేలా చేసిన మహనీయులు.
              ఈ వెబ్‌సైట్ ద్వారా ఆయన ప్రవచనాలు వీడియోలు, ఆడియోలు, పుస్తకాలు అందుబాటులో ఉంటాయి.
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
            {isTelugu ? "పుస్తకాలు చూడండి" : "View Books"}
          </Link>
          <Link to="/videos" className="w-full p-3 bg-indigo-500 text-white text-center rounded hover:bg-indigo-600">
            {isTelugu ? "వీడియోలు చూడండి" : "View Videos"}
          </Link>
          <Link to="/audios" className="w-full p-3 bg-indigo-500 text-white text-center rounded hover:bg-indigo-600">
            {isTelugu ? "ఆడియోలు వినండి" : "Listen Audios"}
          </Link>
          <Link to="/gallery" className="w-full p-3 bg-indigo-500 text-white text-center rounded hover:bg-indigo-600">
            {isTelugu ? "గ్యాలరీ చూడండి" : "View Gallery"}
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
