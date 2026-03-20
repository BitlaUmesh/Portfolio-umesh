"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ progress }: { progress: MotionValue<number> }) {
  // Section 1: 0% to 15% (Strictly 0 past 15%)
  const opacity1 = useTransform(progress, [0, 0.1, 0.15, 1], [1, 1, 0, 0]);
  const y1 = useTransform(progress, [0, 0.15, 1], [0, -50, -50]);

  // Section 2: 22% to 36% (Condensed for better flow)
  const opacity2 = useTransform(progress, [0, 0.18, 0.22, 0.36, 0.40, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(progress, [0, 0.18, 0.22, 0.36, 0.40, 1], [30, 30, 0, 0, -30, -30]);

  // Section 3: 50% to 70% (Extended duration for more prominence)
  const opacity3 = useTransform(progress, [0, 0.46, 0.50, 0.70, 0.74, 1], [0, 0, 1, 1, 0, 0]);
  const y3 = useTransform(progress, [0, 0.46, 0.50, 0.70, 0.74, 1], [30, 30, 0, 0, -30, -30]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8 md:p-24 z-10 w-full h-full">
      
      {/* SECTION 1: Center */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
          BITLA UMESH KUMAR
        </h1>
        <p className="text-xl md:text-3xl text-white/80 font-light tracking-wide">
          AI Engineer.
        </p>
      </motion.div>

      {/* SECTION 2: Left Aligned - Pushed further left to clear face */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute left-6 md:left-[10vw] top-1/2 -translate-y-1/2 max-w-sm md:max-w-md lg:max-w-lg"
      >
        <h2 className="text-2xl md:text-5xl font-semibold leading-tight text-white drop-shadow-md">
          Specializing in AI/ML & Full-Stack Development.
        </h2>
        <div className="w-16 h-1 bg-white mt-6 rounded-full" />
      </motion.div>

      {/* SECTION 3: Right Aligned - Pushed further right to clear face */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute right-6 md:right-[10vw] top-1/2 -translate-y-1/2 max-w-sm md:max-w-md lg:max-w-lg text-right"
      >
        <h2 className="text-2xl md:text-5xl font-semibold leading-tight text-white drop-shadow-md">
          Architecting AI-native solutions & scalable platforms.
        </h2>
        <div className="w-16 h-1 bg-white mt-6 rounded-full ml-auto" />
      </motion.div>

    </div>
  );
}
