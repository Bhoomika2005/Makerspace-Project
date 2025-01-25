"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Header from "@/components/header"
import Navbar from "@/components/navbar"
import TariffCards from "@/components/tariffCard"
import OfferCard from "@/components/offerCard"
import { Cog, GraduationCap, Users } from "lucide-react"
import styles from "@/components/OfferCard.module.css"

export default function Home() {
  const ref = useRef(null)
  const mechanicalSectionRef = useRef(null)
  const offersSectionRef = useRef(null)
  const isInView = useInView(mechanicalSectionRef, { once: true, amount: 0.2 })
  const isOffersInView = useInView(offersSectionRef, { once: true, amount: 0.2 })
  const [headerHeight, setHeaderHeight] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  useEffect(() => {
    const header = document.querySelector("header")
    if (header) {
      setHeaderHeight(header.offsetHeight)
    }
  }, [])

  const textVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      rotate: 5,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },
  }

  const tariffCardX = useTransform(scrollYProgress, [0, 0.4], ["100%", "0%"])
  const tariffCardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const mechanicalSectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative" ref={ref}>
      {/* Background Video */}
      <div className="fixed inset-0 -z-10">
        <video src="/images/bg_video.mp4" autoPlay loop muted className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent"></div>
      </div>

      {/* Header (not sticky) */}
      <Header />

      {/* Navbar (becomes sticky after scrolling past header) */}
      <div className="sticky z-50" style={{ top: 0 }}>
        <Navbar />
      </div>

      {/* Landing screen content */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Glass Parallelogram Overlay */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="absolute top-[15%] left-[20%] transform -translate-x-1/2 -translate-y-2/3 w-96 h-64"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-lg transform skew-x-[-10deg] rounded-lg shadow-lg">
              <motion.div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-2">
                  Innovate
                </motion.h1>
                <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-2">
                  Create
                </motion.h1>
                <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-4">
                  Learn
                </motion.h1>
                <motion.p variants={itemVariants} className="opacity-80">
                  @ IIT Indore's Premier Fabrication Lab
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* About Us Section with TariffCards */}
      <motion.div
        ref={mechanicalSectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={mechanicalSectionVariants}
        className="flex w-full min-h-[120vh] bg-white/50 backdrop-blur-sm"
        style={{ background: "linear-gradient(135deg, #027cc4, #0610ab)" }}
      >
        <div className="w-3/5 p-12 flex flex-col justify-center">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6 text-gray-200">
            About MakerSpace
          </motion.h2>
          <motion.ul variants={textVariants} className="list-disc pl-6 space-y-4 text-lg text-gray-200">
            <motion.li variants={itemVariants} className="flex items-start space-x-2">
              <span>💡</span>
              <span>
                IIT Indore MakerSpace is a DIY facility for people who like to make things, are curious about how stuff
                works, or would like to learn new skills in tinkering.
              </span>
            </motion.li>
            <motion.li variants={itemVariants} className="flex items-start space-x-2">
              <span>🔧</span>
              <span>
                Our space is equipped with state-of-the-art machines such as laser cutters, waterjet cutters, CNC
                routers, 3D printers, PCB prototyping stations, soldering stations, welding kits, and various hand and
                power tools.
              </span>
            </motion.li>
            <motion.li variants={itemVariants} className="flex items-start space-x-2">
              <span>📅</span>
              <span>You can learn these machines by taking part in weekly scheduled training sessions.</span>
            </motion.li>
            <motion.li variants={itemVariants} className="flex items-start space-x-2">
              <span>🏫</span>
              <span>
                MakerSpace is open to the entire IIT Indore community and believes in the principle , <br></br>
                <strong>Curiosity-Connects-Creativity</strong>.
              </span>
            </motion.li>
          </motion.ul>
        </div>

        {/* Right Side - TariffCards with Scroll Animation */}
        <motion.div
          style={{
            x: tariffCardX,
            opacity: tariffCardOpacity,
          }}
          className="w-2/5 flex items-center justify-center"
        >
          <TariffCards />
        </motion.div>
      </motion.div>

      {/* What we Offer section */}
      <div id="offer-section" className="w-full min-h-screen bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-8 py-28 h-full flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-center mb-48 bg-gradient-to-r from-[#027cc4] to-[#0610ab] text-transparent bg-clip-text">
            What we Offer!
          </h2>
          <div className="flex flex-row justify-center items-start gap-16">
            <OfferCard
              title="State of the Art Machinery"
              description="Access to cutting edge equipments for your projects"
              icon={<Cog size={64} strokeWidth={1.5} className={styles.machineIcon} />}
            />
            <OfferCard
              title="Comprehensive Courses"
              description="Learn from experts in various fabrication techniques"
              icon={<GraduationCap size={64} strokeWidth={1.5} className={styles.machineIcon} />}
            />
            <OfferCard
              title="Collaborative Environment"
              description="Connect with like minded innovators and Creators"
              icon={<Users size={64} strokeWidth={1.5} className={styles.machineIcon} />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

