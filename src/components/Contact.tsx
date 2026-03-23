"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, AlertCircle } from "lucide-react";
import ScrambleText from "@/components/ScrambleText";
import Magnetic from "@/components/Magnetic";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      if (resData.success) {
        toast.success("Transmission successful", {
          description: "Message delivered to the mainframe. I'll be in touch soon.",
        });
        reset();
      } else {
        toast.error("Transmission failed", {
          description: "Could not deliver the message. Check your connection and try again.",
        });
      }
    } catch {
      toast.error("Transmission error", {
        description: "An unexpected anomaly occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-[#111111] py-32 px-8 md:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Heading & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-8">
              <ScrambleText text="Get in Touch" />
            </h2>
            <p className="text-xl text-white/50 font-light mb-12 max-w-md">
              Have a project in mind or want to explore AI engineering opportunities? Drop a message or connect via socials.
            </p>

            <div className="flex flex-wrap gap-4">
              <Magnetic>
                <a 
                  href="https://github.com/BitlaUmesh" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-mono text-sm tracking-widest text-[10px]">GITHUB</span>
                </a>
              </Magnetic>
              
              <Magnetic>
                <a 
                  href="https://linkedin.com/in/bitla-umesh-kumar" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-mono text-sm tracking-widest text-[10px]">LINKEDIN</span>
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div 
              whileHover={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.03)" }}
              className="bg-white/[0.015] border border-white/10 rounded-[2rem] p-8 md:p-10 transition-colors duration-500 backdrop-blur-sm"
            >
              <div className="mb-8">
                <h3 className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/70 mb-4 px-1">Send a Message</h3>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[9px] font-mono font-medium text-white/40 mb-2 uppercase tracking-widest px-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      {...register("name")}
                      className={`w-full bg-white/[0.03] border ${errors.name ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.06] transition-all text-sm`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-2 text-[10px] text-red-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[9px] font-mono font-medium text-white/40 mb-2 uppercase tracking-widest px-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      {...register("email")}
                      className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.06] transition-all text-sm`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-[10px] text-red-400 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-[9px] font-mono font-medium text-white/40 mb-2 uppercase tracking-widest px-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    {...register("message")}
                    className={`w-full bg-white/[0.03] border ${errors.message ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.06] transition-all resize-none text-sm`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-[10px] text-red-400 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" /> {errors.message.message}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-start pt-2">
                  <Magnetic>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[10px] tracking-[0.2em] uppercase"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </Magnetic>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
