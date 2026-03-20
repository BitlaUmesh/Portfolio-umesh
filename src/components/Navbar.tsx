"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import ScrambleText from "@/components/ScrambleText";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-4 bg-black/50 backdrop-blur-md border-b border-white/5" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24 flex items-center justify-between">
        <Magnetic>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold tracking-tighter text-white"
          >
            <ScrambleText text="BITLA UMESH KUMAR" />
          </motion.div>
        </Magnetic>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Magnetic>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/50 hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        {/* Mobile menu could be added here if needed */}
        <div className="md:hidden">
          <button className="text-white/50 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
