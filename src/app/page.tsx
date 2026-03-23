"use client";

import { useState } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import { motion } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#121212] min-h-screen text-white">
      <Preloader onComplete={() => setLoading(false)} />
      
      {/* We keep the components mounted but animate them in when loading is done */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative"
      >
        <Navbar />
        <ScrollyCanvas />
        <section id="projects">
          <Projects />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="contact">
          <Contact />
        </section>
        
        <footer className="w-full border-t border-white/5 py-16 flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
          
          <div className="opacity-10">
            <p className="text-[10px] uppercase tracking-[0.5em] font-light">Digital Architect {"©"} 2026</p>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
