"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Magnetic from "@/components/Magnetic";
import { Github, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
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
      
      <footer className="w-full border-t border-white/5 py-24 flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
        
        <p className="text-white/20 text-xs tracking-[0.4em] uppercase mb-10 font-medium">Connect.</p>
        
        <div className="flex items-center justify-center gap-6 relative z-10">
          <Magnetic>
            <a 
              href="https://github.com/BitlaUmesh" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)]"
            >
              <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-mono text-sm tracking-wider">GITHUB</span>
            </a>
          </Magnetic>
          
          <Magnetic>
            <a 
              href="https://linkedin.com/in/bitla-umesh-kumar" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)]"
            >
              <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-mono text-sm tracking-wider">LINKEDIN</span>
            </a>
          </Magnetic>
        </div>
        
        <div className="mt-16 opacity-10">
          <p className="text-[10px] uppercase tracking-[0.5em] font-light">Digital Architect {"©"} 2026</p>
        </div>
      </footer>
    </main>
  );
}
