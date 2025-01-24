"use client";

import Image from "next/image";
import { Telescope, Link, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="relative w-full pt-3">
      <div className="max-w-6xl mx-auto rounded-t-lg shadow-[0_4px_30px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] backdrop-filter backdrop-blur-md bg-white/20">
        <div className="flex flex-col items-center py-3 px-2">
          <div className="flex items-center space-x-3">
            {/* <div className="relative w-20 h-20 p-2 backdrop-filter backdrop-blur-md bg-white/10 rounded-xl"> */}
            <div className="relative w-20 h-20 p-2">
              <Image
                src="/images/iiti.png"
                alt="IIT Indore MakerSpace Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-5xl font-bold tracking-wide mb-1 font-sans">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  M
                </span>
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  aker
                </motion.span>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  S
                </span>
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  pace
                </motion.span>
              </h1>

              <p className="text-gray-200 text-lg font-bold tracking-wider text-center font-sans">
                INDIAN INSTITUTE OF TECHNOLOGY INDORE
              </p>
            </div>

            {/* <div className="relative w-20 h-20 p-1 backdrop-filter backdrop-blur-md bg-white/10 rounded-xl"> */}
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

          {/* <div className="w-full mt-2 border-t-2 border-black pt-2">
            <div className="flex justify-center items-center space-x-6 text-gray-700 w-full mx-3 pt-1">
              <IconCard icon={<Telescope className="w-4 h-4" />} text="CURIOSITY" />
              <IconCard icon={<Link className="w-4 h-4" />} text="CONNECTS" />
              <IconCard icon={<Lightbulb className="w-4 h-4" />} text="CREATIVITY" />
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

const IconCard = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <motion.div
      className="flex items-center space-x-2 group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md cursor-pointer">
        {icon}
      </div>
      <motion.div
        className="px-2 py-0.5 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-sans font-medium tracking-wide">{text}</p>
      </motion.div>
    </motion.div>
  );
};

export default Header;
