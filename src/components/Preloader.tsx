"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    
    // Disable scroll during preloading
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      // jump randomly
      currentProgress += Math.floor(Math.random() * 20) + 2;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(currentProgress);
        clearInterval(interval);
        
        // Wait a bit at 100% before firing complete
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = "";
          // The AnimatePresence in the component handles the exit animation.
          // We call onComplete slightly before or exactly after it finishes 
          // to let the main page start animating.
          setTimeout(onComplete, 800); 
        }, 600);
      } else {
        setProgress(currentProgress);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-[#111111] text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center space-y-8">
            <h1 className="text-[10px] font-mono tracking-[0.5em] text-white/50 uppercase">
              Initializing Systems
            </h1>
            
            <div className="font-mono text-7xl md:text-9xl font-bold tracking-tighter">
              {progress}%
            </div>
            
            <div className="h-[2px] w-64 bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
