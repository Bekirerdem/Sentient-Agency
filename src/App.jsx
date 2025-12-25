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
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <ReactLenis root>
      <CursorProvider>
        <div className="bg-black min-h-screen text-white selection:bg-[#CCFF00] selection:text-black relative">
          
          {/* GLOBAL GRAIN OVERLAY */}
          <div className="grain-overlay" />

          {/* INTERACTIVE BACKGROUND GLOW */}
          <div 
            className="fixed inset-0 z-[1] pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(204, 255, 0, 0.06), transparent 40%)`
            }}
          />

          <Cursor />
          <Navbar />
          
          <main className="relative z-10">
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