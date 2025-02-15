"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import TariffCards from "@/components/TariffCards";
import OfferCard from "@/components/OfferCard";
import { Cog, GraduationCap, Users } from "lucide-react";
import styles from "@/components/OfferCard.module.css";
import HomePageCard from "@/components/HomePageCard";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  const ref = useRef(null);
  const mechanicalSectionRef = useRef(null);
  const offersSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isAnimationDelayed, setIsAnimationDelayed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const isInView = useInView(mechanicalSectionRef, { once: true, amount: 0.2 });
  const isOffersInView = useInView(offersSectionRef, {
    once: true,
    amount: 0.2,
  });

  const tariffCardX = useTransform(scrollYProgress, [0, 0.3], ["100%", "0%"]);
  const tariffCardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const textVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotate: 5 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 20 },
    },
  };

  const mechanicalSectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setHeaderHeight(header.offsetHeight);

    const timeout = setTimeout(() => setIsAnimationDelayed(true), 5000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const token = Cookies.get("access");
        if (!token) {
          setIsLoggedIn(false);
          setIsAdmin(false);
          return;
        }

        setIsLoggedIn(true);
        const userCookie = Cookies.get("user");
        if (userCookie) {
          const userDetails = JSON.parse(userCookie);
          setUser(userDetails);
          setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
        }
      } catch (error) {
        console.error("Error checking the user status:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
    checkAdminStatus();
  }, []);

  const handleSignOut = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("user");

    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/auth/callback"
    );
    const scope = encodeURIComponent("email profile openid");

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=code&` +
      `scope=${scope}&` +
      `access_type=offline&` +
      `prompt=consent`;

    window.location.href = authUrl;
  };
  return (
    <div className="relative" ref={ref}>
      {isLoggedIn && !isAdmin ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Sorry! You do not have Admin Access !!
          </h1>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleSignOut();
              router.push("/");
            }}
          >
            Go Back to Home Page
          </Button>
        </div>
      ) : (
        <>
          {/* Background Video */}
          <div className="fixed inset-0 -z-10">
            <video
              src="/images/makerspace_tour.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"></div>
          </div>

          {/* Header (not sticky) */}
          <Header />

          {/* Navbar (becomes sticky after scrolling past header) */}
          <div className="sticky z-50" style={{ top: 0 }}>
            <Navbar />
          </div>

          {/* Landing screen content */}
          <div className="relative min-h-screen flex items-center justify-center">
            
            {/* <motion.div
              initial="hidden"
              animate={isAnimationDelayed ? "visible" : "hidden"}
              variants={textVariants}
              className="absolute top-[15%] left-[37%] transform -translate-x-1/2 -translate-y-2/3 w-96 h-64"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-lg transform skew-x-[-10deg] rounded-lg shadow-lg">
                  <motion.div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                    <motion.h1
                      variants={itemVariants}
                      className="text-5xl font-bold mb-2"
                    >
                      Innovate
                    </motion.h1>
                    <motion.h1
                      variants={itemVariants}
                      className="text-5xl font-bold mb-2"
                    >
                      Create
                    </motion.h1>
                    <motion.h1
                      variants={itemVariants}
                      className="text-5xl font-bold mb-4"
                    >
                      Learn
                    </motion.h1>
                    <motion.p variants={itemVariants} className="opacity-80">
                      @ IIT Indore's Premier Fabrication Lab
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div> */}

            {/* Button for Lab Tour */}
            <div className="absolute bottom-12 right-12">
              <Button
                // style={{
                //   background: "linear-gradient(135deg, #027cc4, #0610ab)",
                // }}
                className="maker-button transition-all duration-300 hover:bg-white hover:text-[#0610ab]"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/15mWzZdbtCumzHKbe974FS8qG0fFJR8_V/view?ts=679717b9",
                    "_blank"
                  )
                }
              >
                Dive into MakerSpace
              </Button>
            </div>
          </div>

          {/* Remaining content */}
          <motion.div
            ref={mechanicalSectionRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={mechanicalSectionVariants}
            className="flex w-full min-h-[120vh] bg-white/50 backdrop-blur-sm"
            style={{ background: "linear-gradient(135deg, #027cc4, #0610ab)" }}
          >
            <div className="w-3/5 p-12 flex flex-col justify-center">
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold mb-6 text-gray-200"
              >
                About MakerSpace
              </motion.h2>
              <motion.ul
                variants={textVariants}
                className="list-disc pl-6 space-y-4 text-lg text-gray-200"
              >
                <motion.li
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <span>💡</span>
                  <span>
                    IIT Indore MakerSpace is a DIY facility for people who like
                    to make things, are curious about how stuff works, or would
                    like to learn new skills in tinkering.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <span>🔧</span>
                  <span>
                    Our space is equipped with state-of-the-art machines such as
                    laser cutters, waterjet cutters, CNC routers, 3D printers,
                    PCB prototyping stations, soldering stations, welding kits,
                    and various hand and power tools.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <span>📅</span>
                  <span>
                    You can learn these machines by taking part in weekly
                    scheduled training sessions.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <span>🏫</span>
                  <span>
                    MakerSpace is open to the entire IIT Indore community and
                    believes in the principle , <br></br>
                    <strong>Curiosity-Connects-Creativity</strong>.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <span>🌟</span>
                  <span>
                    MakerSpace encourages collaboration and teamwork, fostering
                    an environment where ideas are shared, and creativity
                    thrives through collective efforts.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <span>🚀</span>
                  <span>
                    Members have access to mentorship from experts in
                    engineering, design, and prototyping, helping turn
                    innovative ideas into reality.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <span>🌍</span>
                  <span>
                    By participating in various projects, workshops, and
                    competitions, MakerSpace helps students gain hands-on
                    experience and prepares them for real-world challenges.
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
          <div
            id="offer-section"
            className="w-full min-h-screen bg-white/80 backdrop-blur-sm"
          >
            <div className="container mx-auto px-8 py-28 h-auto flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold text-center mb-36 bg-gradient-to-r from-[#027cc4] to-[#0610ab] text-transparent bg-clip-text">
                What we Offer!
                <span className="block w-32 h-1 bg-gradient-to-r from-[#027cc4] to-[#0610ab] mx-auto mt-2 rounded"></span>
              </h2>
              <div className="flex flex-row justify-center items-start gap-16">
                <OfferCard
                  title="State of the Art Machinery"
                  description="Access to cutting edge equipments for your projects"
                  icon={
                    <Cog
                      size={64}
                      strokeWidth={1.5}
                      className={styles.machineIcon}
                    />
                  }
                />
                <OfferCard
                  title="Comprehensive Courses"
                  description="Learn from experts in various fabrication techniques"
                  icon={
                    <GraduationCap
                      size={64}
                      strokeWidth={1.5}
                      className={styles.machineIcon}
                    />
                  }
                />
                <OfferCard
                  title="Collaborative Environment"
                  description="Connect with like minded innovators and Creators"
                  icon={
                    <Users
                      size={64}
                      strokeWidth={1.5}
                      className={styles.machineIcon}
                    />
                  }
                />
              </div>
            </div>
            {/* <Footer/> */}
            <div className="w-full min-h-screen">
              <div className="container mx-auto px-8 py-10">
                <h2 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-[#027cc4] to-[#0610ab] text-transparent bg-clip-text">
                  MakerSpace Highlights
                  <span className="block w-32 h-1 bg-gradient-to-r from-[#027cc4] to-[#0610ab] mx-auto mt-2 rounded"></span>
                </h2>

                <div
                  className="grid grid-cols-3 gap-6 max-w-6xl mx-auto"
                  style={{ gridTemplateRows: "repeat(8, 60px)" }}
                >
                  <HomePageCard
                    title="TRAINING"
                    image="/images/training.jpg"
                    className="col-span-1 row-span-5"
                  />
                  <HomePageCard
                    title="PROJECTS"
                    image="/images/project.jpg"
                    className="col-span-1 row-span-4"
                  />
                  <HomePageCard
                    title="COMPETITIONS"
                    image="/images/competition.jpg"
                    className="col-span-1 row-span-3"
                  />
                  <HomePageCard
                    title="EXPO"
                    image="/images/expo2.png"
                    className="col-span-1 row-span-3 row-start-6"
                  />
                  <HomePageCard
                    title="VISITS"
                    image="/images/visits2.jpg"
                    className="col-span-1 row-span-4 row-start-5"
                  />
                  <HomePageCard
                    title="OUTREACH"
                    image="/images/outreach.jpg"
                    className="col-span-1 row-span-5 row-start-4"
                  />
                </div>
              </div>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="absolute bottom-5 right-5">
              <Button
                className="admin-button transition-all duration-300 hover:bg-white hover:text-[#0610ab]"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="absolute bottom-5 right-5">
              <Button
                className="admin-button transition-all duration-300 hover:bg-white hover:text-[#0610ab]"
                onClick={handleGoogleLogin}
              >
                Admin Login
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
