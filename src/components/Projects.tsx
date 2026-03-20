"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ScrambleText from "@/components/ScrambleText";

const projects = [
  {
    id: 1,
    title: "SENTRY",
    category: "Security Orchestration (Novus’24)",
    image: "/sentry-cover.png",
    link: "https://github.com/BitlaUmesh/SENTRY",
    description: "A ChatOps-first SOAR platform utilizing FastAPI and Llama 3.1 to automate SOC alerts and analyze threats in real-time."
  },
  {
    id: 2,
    title: "Neural-Sync",
    category: "Real-time AI Inference (HackForge)",
    image: "/neural-sync-cover.png",
    link: "https://github.com/BitlaUmesh/Neural_Sync",
    description: "IDE-native semantic merge engine that resolves stochastic merge conflicts by aligning NN outputs with structural code logic."
  },
];

export default function Projects() {
  return (
    <section className="relative w-full min-h-screen bg-[#111111] py-32 px-8 md:px-24">
      {/* Background glow or noise could be added here */}
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            <ScrambleText text="Award-Winning Projects" />
          </h2>
          <p className="text-xl text-white/50 max-w-2xl font-light">
            A showcase of AI-native hackathon wins and full-stack solutions, combining bleeding-edge tech with meticulous execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group relative block overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 md:p-6 transition-all hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.2)]"
            >
              <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden rounded-xl mb-6">
                {/* Fallback pattern/color when image isn't loaded */}
                <div className="absolute inset-0 bg-neutral-800" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-white/50 uppercase tracking-wider mb-1 font-medium">
                      {project.category}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black shrink-0">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </div>
                </div>
                <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
