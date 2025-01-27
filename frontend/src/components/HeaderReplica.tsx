"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  return (
    <header className="relative w-full pt-3">
      <div className="max-w-6xl mx-auto rounded-t-lg shadow-[0_4px_7px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] bg-gradient-to-r from-[#027cc4] to-[#0610ab]">
        <Link href='/'>
        
        <div className="flex py-2 px-2 ml-44">
          <div className="relative w-36 self-stretch flex items-center justify-center bg-white/90 backdrop-filter backdrop-blur-sm rounded-md p-2 hover:bg-white/20 transition-colors">
            <Image
              src="/images/iiti.png"
              alt="Left Logo"
              width={100}
              height={100}
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
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

          <div className="relative w-36 self-stretch flex items-center justify-center mr-44 bg-white/90 backdrop-filter backdrop-blur-sm rounded-md p-2 hover:bg-white/20 transition-colors">
            <Image
              src="/images/ms_logo.png"
              alt="Right Logo"
              width={110}
              height={110}
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
            />
          </div>
        </div>
        </Link>
      </div>
      
    </header>
  );
};

export default Header;

// relative w-24 h-22 px-2 backdrop-filter backdrop-blur-md bg-gray-200 shadow-[inset_0_4px_7px_rgba(0,0,0,0.3)]
// bg-gradient-to-r from-[#027cc4] to-[#0610ab]
