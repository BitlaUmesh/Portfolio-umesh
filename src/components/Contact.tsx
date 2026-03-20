"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    // Access key configured via environment variables (.env.local)
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
    formData.append("access_key", accessKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full bg-[#111111] py-32 px-8 md:px-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            <ScrambleText text="Get in Touch" />
          </h2>
          <p className="text-xl text-white/50 font-light">
            Have a project in mind or want to explore AI engineering opportunities? Drop a message.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required 
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
            <textarea 
              name="message" 
              id="message" 
              required 
              rows={5}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          
          <div className="flex justify-center">
            <Magnetic>
              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="px-12 py-4 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </Magnetic>
          </div>

          {status === "success" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 mt-4 text-center font-medium">
              Message sent successfully! I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 mt-4 text-center font-medium">
              Something went wrong. Please ensure you&apos;ve added your Web3Forms Access Key.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
