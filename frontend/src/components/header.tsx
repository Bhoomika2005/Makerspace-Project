"use client"

import Image from "next/image"
import { Telescope, Link, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

const Header = () => {
  return (
    <header className="relative w-full pt-5">
      <div className="max-w-4xl mx-auto bg-gray-200 border-2 border-black rounded-t-lg shadow-lg backdrop-blur-md backdrop-saturate-150"> {/* Changed border color to black */}
        <div className="flex flex-col items-center py-3 px-4"> {/* Reduced padding here */}
          <div className="flex items-center space-x-3"> {/* Reduced space between logo and text */}
            <div className="relative w-32 h-32">
              <Image
                src="/images/iiti.png"
                alt="IIT Indore MakerSpace Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center">
              {/* MakerSpace text with partial slide-out animation */}
              <h1 className="text-5xl font-bold tracking-wide mb-1 font-sans">
                <span className="text-[#0211ad]">M</span>
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-[#0211ad]"
                >
                  aker
                </motion.span>
                <span className="text-[#0211ad]">S</span>
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  className="text-[#0211ad]"
                >
                  pace
                </motion.span>
              </h1>

              {/* Institute name bold and without animation */}
              <p className="text-gray-700 text-lg font-bold tracking-wider text-center font-sans">
                INDIAN INSTITUTE OF TECHNOLOGY INDORE
              </p>
            </div>

            <div className="relative w-35 h-35">
              <Image
                src="/images/ms_logo.png"
                alt="IIT Indore MakerSpace Logo"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>

          </div>

          <div className="w-full mt-4 border-t-2 border-black pt-2">
            <div className="flex justify-center items-center space-x-8 text-gray-700 w-full mx-3 pt-1">
              <IconCard icon={<Telescope className="w-5 h-5" />} text="CURIOSITY" />
              <IconCard icon={<Link className="w-5 h-5" />} text="CONNECTS" />
              <IconCard icon={<Lightbulb className="w-5 h-5" />} text="CREATIVITY" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const IconCard = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <motion.div
      className="flex items-center space-x-2 group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md cursor-pointer">
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
  )
}

export default Header
