// src/App.jsx
import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Manifesto from "./components/Manifesto";
import Showreel from "./components/Showreel"; 
import ServicesGrid from "./components/ServicesGrid";
import Process from "./components/Process"; 
import Works from "./components/Work"; // DÜZELTİLDİ: Dosya adın 'Work.jsx' olduğu için burası 'Work' olmalı.
import Footer from "./components/Footer";
import { CursorProvider } from "./context/CursorContext";
import Cursor from "./components/Cursor";
import { ReactLenis } from 'lenis/react';

const App = () => {
  return (
    <ReactLenis root>
      <CursorProvider>
        <div className="bg-black min-h-screen text-white selection:bg-[#CCFF00] selection:text-black">
          <Cursor />
          <Navbar />
          
          <main>
            <Hero />
            <Manifesto />
            <Showreel />
            <ServicesGrid />
            <Works />
            <Process />
          </main>
          
          <Footer />
        </div>
      </CursorProvider>
    </ReactLenis>
  );
};

export default App;