"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "@/components/Overlay";

const FRAME_COUNT = 120; // 000 to 119

const currentFrameIndex = (index: number) => {
  return `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.066s.png`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const preloadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrameIndex(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      // Error handling to prevent hanging on missing frames
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      preloadedImages.push(img);
    }
    setImages(preloadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const renderFrame = useCallback((index: number) => {
    if (!images[index] || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize
    if (!ctx) return;

    const img = images[index];
    if (!img.complete || img.naturalWidth === 0) return; // Prevent drawing error
    
    // Pixel ratio setup should be done on resize
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;
    
    // Object-fit: cover logic
    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    // Fill background
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw image centered and covering canvas
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const pixelRatio = window.devicePixelRatio || 1;
        canvasRef.current.width = width * pixelRatio;
        canvasRef.current.height = height * pixelRatio;
        canvasRef.current.style.width = width + "px";
        canvasRef.current.style.height = height + "px";

        if (loaded) {
          const currentFrame = Math.min(
            FRAME_COUNT - 1,
            Math.floor(scrollYProgress.get() * FRAME_COUNT)
          );
          renderFrame(currentFrame);
        }
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, renderFrame, scrollYProgress]);

  // Initial draw
  useEffect(() => {
    if (loaded && scrollYProgress.get() === 0) {
      renderFrame(0);
    }
  }, [loaded, renderFrame, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
      <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* Loading State overlay */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50">
            <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
            <p className="mt-8 text-white/40 text-xs tracking-[0.3em] font-medium uppercase font-sans">
              Initiating Sequence
            </p>
          </div>
        )}

        {/* Text Overlay passed scrollYProgress */}
        <Overlay progress={scrollYProgress} />
      </div>
    </div>
  );
}
