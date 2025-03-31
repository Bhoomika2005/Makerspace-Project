"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const HeaderReplica = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={`relative w-full ${isMobile ? "" : "pt-3"}`}>
      <div className={`max-w-6xl mx-auto shadow-[0_4px_7px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] bg-gradient-to-r from-[#027cc4] to-[#0610ab]
      ${
        isMobile ? "" : "rounded-t-lg"
      }`}>
        <Link href="/">
          <div className={`flex ${isMobile ? "flex-col" : "py-2 px-2 ml-44"}`}>
            {/* Left Logo - Only visible on desktop */}
            {!isMobile && (
              <div className="relative w-36 self-stretch flex items-center justify-center bg-slate-200 backdrop-filter backdrop-blur-sm rounded-md p-2 hover:bg-white/10 transition-colors">
                <Image
                  src="/images/iiti.png"
                  alt="Left Logo"
                  width={100}
                  height={100}
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                />
              </div>
            )}

            {/* Center Content */}
            <div className="flex-1 flex flex-col items-center w-auto">
              {/* Institute Name */}
              <div
                className={`flex flex-col items-center border-b border-gray-200/30 w-auto mb-1 ${
                  isSmallMobile ? "px-2 pt-3" : isMobile ? "pt-3" : ""
                }`}
              >
                <div
                  className={`text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${
                    isSmallMobile ? "text-xs" : isMobile ? "text-sm" : "text-lg"
                  } font-bold text-center`}
                >
                  भारतीय प्रौद्योगिकी संस्थान इंदौर
                </div>
                <div
                  className={`text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${
                    isSmallMobile ? "text-xs" : isMobile ? "text-sm" : "text-lg"
                  } font-bold text-center`}
                >
                  INDIAN INSTITUTE OF TECHNOLOGY INDORE
                </div>
              </div>

              {/* MakerSpace Title with Animation */}
              <h1
                className={`${
                  isSmallMobile
                    ? "text-2xl"
                    : isMobile
                    ? "text-3xl"
                    : "text-5xl"
                } font-bold tracking-wide mb-1 font-sans text-center`}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  M
                </span>
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                >
                  aker
                </motion.span>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  S
                </span>
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                >
                  pace
                </motion.span>
              </h1>

              {/* Tagline */}
              <p
                className={`text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${
                  isSmallMobile
                    ? "text-xs pb-3"
                    : isMobile
                    ? "text-sm pb-3"
                    : "text-lg"
                } text-center`}
              >
                Curiosity-Connects-Creativity
              </p>
            </div>

            {/* Right Logo - Only visible on desktop */}
            {!isMobile && (
              <div className="relative w-36 self-stretch flex items-center bg-white/20 justify-center mr-44 backdrop-filter backdrop-blur-sm rounded-md p-2 hover:bg-white/10 transition-colors">
                <Image
                  src="/images/makerspace_logo.png"
                  alt="Right Logo"
                  width={160}
                  height={160}
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                />
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default HeaderReplica;
