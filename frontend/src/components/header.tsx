"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
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
      <div className="max-w-6xl mx-auto rounded-t-lg shadow-[0_4px_7px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] backdrop-filter backdrop-blur-md bg-white/20">
        <Link href="/">
          <div
            className={`flex flex-col py-2 px-2 ${
              isMobile ? "" : "ml-44 md:flex-row"
            }`}
          >
            {/* Logos container for mobile - centered together */}
            {isMobile && (
              <div className="w-full flex justify-center items-center mb-3">
                <div className="flex space-x-3 items-center">
                  {/* Left Logo - IIT Indore */}
                  <Image
                    src="/images/iiti.png"
                    alt="IIT Indore Logo"
                    width={isSmallMobile ? 60 : 65}
                    height={isSmallMobile ? 60 : 65}
                    className="object-contain"
                  />

                  {/* Right Logo - MakerSpace */}
                  <Image
                    src="/images/makerspace_logo.png"
                    alt="MakerSpace Logo"
                    width={isSmallMobile ? 60 : 65}
                    height={isSmallMobile ? 60 : 65}
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {/* Non-mobile left logo */}
            {!isMobile && (
              <div className="w-32 self-stretch flex items-center">
                <Image
                  src="/images/iiti.png"
                  alt="IIT Indore Logo"
                  width={120}
                  height={120}
                  className="object-contain h-full"
                />
              </div>
            )}

            {/* Center Content */}
            <div className="flex-1 flex flex-col items-center w-auto">
              {/* Institute Name */}
              <div
                className={`flex flex-col items-center border-b border-gray-200/30 w-auto mb-1 ${
                  isSmallMobile ? "px-2" : ""
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
                  isSmallMobile ? "text-xs" : isMobile ? "text-sm" : "text-lg"
                } text-center`}
              >
                Curiosity-Connects-Creativity
              </p>
            </div>

            {/* Non-mobile right logo */}
            {!isMobile && (
              <div className="w-32 self-stretch flex items-center mr-44">
                <Image
                  src="/images/makerspace_logo.png"
                  alt="MakerSpace Logo"
                  width={160}
                  height={160}
                  className="object-contain h-full py-2"
                />
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
