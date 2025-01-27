"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="relative w-full pt-3">
      <div className="max-w-6xl mx-auto rounded-t-lg shadow-[0_4px_7px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] backdrop-filter backdrop-blur-md bg-white/20">
        <div className="flex py-2 px-2 ml-44">
          <div className="relative w-32 self-stretch flex items-center justify-center">
            <Image
              src="/images/iiti.png"
              alt="IIT Indore Logo"
              width={120}
              height={120}
              className="object-contain h-full"
            />
          </div>

          <div className="flex-1 flex flex-col items-center w-auto">
            <div className="flex flex-col items-center border-b border-gray-200/30 w-auto mb-1">
              <div className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-lg font-bold">
                भारतीय प्रौद्योगिकी संस्थान इंदौर
              </div>
              <div className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-lg font-bold">
                INDIAN INSTITUTE OF TECHNOLOGY INDORE
              </div>
            </div>

            <h1 className="text-5xl font-bold tracking-wide mb-1 font-sans">
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

            <p className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-lg">
              Curiosity-Connects-Creativity
            </p>
          </div>

          <div className="relative w-32 self-stretch flex items-center justify-center mr-44">
            <Image
              src="/images/ms_logo.png"
              alt="MakerSpace Logo"
              width={130}
              height={130}
              className="object-contain h-full py-2"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// relative w-24 h-22 px-2 backdrop-filter backdrop-blur-md bg-gray-200 shadow-[inset_0_4px_7px_rgba(0,0,0,0.3)]
// bg-gradient-to-r from-[#027cc4] to-[#0610ab]