"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="relative w-full pt-3">
      <div className="max-w-6xl mx-auto rounded-t-lg shadow-[0_4px_7px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] bg-gradient-to-r from-[#027cc4] to-[#0610ab]">

        <div className="flex flex-col items-center py-3 px-2">
          <div className="flex items-center space-x-3">
            <div className="relative w-24 h-22 px-2 backdrop-filter backdrop-blur-md bg-gray-200 shadow-[inset_0_4px_7px_rgba(0,0,0,0.3)]">
            <div className="relative w-20 h-20 p-2">
              <Image
                src="/images/iiti.png"
                alt="IIT Indore MakerSpace Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            </div>

            <div className="flex flex-col items-center">
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
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                >
                  pace
                </motion.span>
              </h1>

              <p className="text-gray-200 text-lg font-bold tracking-wider text-center font-sans">
                INDIAN INSTITUTE OF TECHNOLOGY INDORE
              </p>
            </div>

            <div className="relative w-24 h-22 px-2 backdrop-filter backdrop-blur-md bg-gray-200 shadow-[inset_0_4px_7px_rgba(0,0,0,0.3)]">
            <div className="relative w-20 h-20 p-1">
              <Image
                src="/images/ms_logo.png"
                alt="IIT Indore MakerSpace Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
