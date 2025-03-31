"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SlidingImagesProps {
  side: "left" | "right";
  images: string[];
  speed?: number;
  containerClass?: string;
}

export default function SlidingImages({
  side,
  images,
  speed = 40,
  containerClass = "",
}: SlidingImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duplicatedImages, setDuplicatedImages] = useState<string[]>([]);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    // Duplicate images to create a seamless loop
    setDuplicatedImages([...images, ...images]);
  }, [images]);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId: number;
    positionRef.current = 0;
    
    const animate = (currentTime: number) => {
      if (!containerRef.current) return;
      
      // Calculate time elapsed since last frame
      const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 1000 : 0.016;
      lastTimeRef.current = currentTime;
      
      // Use time-based animation instead of frame-based
      positionRef.current -= speed * deltaTime;

      // Reset position when all images have scrolled through
      if (positionRef.current <= -(images.length * 200)) {
        positionRef.current = 0;
      }

      containerRef.current.style.transform = `translateY(${positionRef.current}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [images.length, speed]);

  return (
    <div
      className={`absolute ${side}-0 w-24 md:w-40 overflow-hidden pointer-events-none ${containerClass}`}
    >
      <div
        className="relative backdrop-blur-md bg-white/30 rounded-xl p-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div ref={containerRef} className="flex flex-col gap-4 py-4">
          {duplicatedImages.map((src, index) => (
            <div
              key={`${side}-${index}`}
              className="w-full aspect-[3/4] relative rounded-lg overflow-hidden"
              style={{
                boxShadow: "2px 5px 5px rgba(0, 0, 0, 0.9)",
                transform: "translateZ(0)",
              }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Sliding image ${index}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}