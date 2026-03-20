"use client";

import { motion } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "YugaYatra Retail OPC Pvt. Ltd.",
    date: "Mar 2026 – May 2026",
    points: [
      "Developing scalable web applications utilizing Cursor AI, Firebase Studio, and integrated AI technologies.",
      "Contributing to live freelance projects and assisting in e-commerce deployments and seller portal management."
    ]
  },
  {
    role: "Founder & Non-Technical Lead",
    company: "LEGION Club (SVIT)",
    date: "Feb 2026 – Present",
    points: [
      "Founded and structured the CSE Department club into Technical and Non-Technical divisions to serve the broader student body.",
      "Directed the Non-Technical division, orchestrating multiple department-wide events and managing all logistical operations."
    ]
  }
];

const education = {
  school: "Swami Vivekananda Institute of Technology",
  degree: "B.Tech in Computer Science",
  date: "Sept 2023 – May 2027",
  gpa: "7.7/10.0",
  coursework: ["Data Structures", "Computer Networking", "DevOps", "DBMS"]
};

const skills = [
  "Python", "C", "HTML", "CSS", "React", "FastAPI", "Streamlit", "ChromaDB", "Git", "Anigravity", "Cursor AI", "Firebase"
];

export default function Experience() {
  return (
    <section className="relative w-full bg-[#111111] py-32 px-8 md:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Experience */}
        <div className="lg:col-span-7">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-12"
          >
            <ScrambleText text="Experience" />
          </motion.h2>

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 border-l border-white/10"
              >
                <div className="absolute w-3 h-3 bg-white rounded-full -left-[1.5px] top-2 -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 mb-4">
                  <span className="text-lg text-white/70">{exp.company}</span>
                  <span className="hidden sm:block text-white/30">•</span>
                  <span className="text-sm font-mono text-white/50">{exp.date}</span>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="text-white/60 font-light leading-relaxed">
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Skills & Education */}
        <div className="lg:col-span-5 space-y-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-8">
              <ScrambleText text="Education" />
            </h2>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white">{education.degree}</h3>
              <p className="text-white/70 mt-1 mb-4">{education.school}</p>
              <p className="text-sm font-mono text-white/50 mb-6">{education.date}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs uppercase tracking-widest font-semibold">GPA</span>
                  <span className="text-white/80 font-mono bg-white/5 px-2 py-1 rounded-md text-sm">{education.gpa}</span>
                </div>
                <div>
                  <span className="text-white/40 text-xs uppercase tracking-widest font-semibold block mb-3">Relevant Coursework</span>
                  <div className="flex flex-wrap gap-2">
                    {education.coursework.map((course, idx) => (
                      <span key={idx} className="text-white/60 text-xs bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-8">
              <ScrambleText text="Technical Arsenal" />
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-white/80 text-sm font-mono backdrop-blur-sm transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
