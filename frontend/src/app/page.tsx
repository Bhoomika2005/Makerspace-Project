"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import TariffCards from "@/components/TariffCards";
import OfferCard from "@/components/offerCard";
import { Cog, GraduationCap, Users } from "lucide-react";
import styles from "@/components/OfferCard.module.css";
import HomePageCard from "@/components/HomePageCard";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
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
          // setIsAdmin(userDetails.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);

          
          const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
          
          setIsAdmin(adminEmails.includes(userDetails.email));
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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
          <h1 className="text-xl md:text-2xl font-bold mb-4 text-red-600 text-center">
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
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <video
              src="/images/makerspace_tour.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full ${
                isMobile ? "object-cover object-center" : "object-cover"
              }`}
              style={isMobile ? { objectPosition: "50% 50%" } : {}}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent"></div>
          </div>

          {/* Header (not sticky) */}
          <Header />

          <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
            <Navbar />
          </div>

          {/* Landing screen content */}
          <div className="relative min-h-screen flex items-center justify-center">
            {/* Button for Lab Tour */}
            <div
              className={`absolute ${
                isMobile ? "bottom-8 right-4" : "bottom-12 right-12"
              }`}
            >
              <Button
                className="maker-button transition-all duration-300 hover:bg-white hover:text-[#0610ab] text-sm md:text-base"
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

          {/* About MakerSpace Section */}
          <motion.div
            ref={mechanicalSectionRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={mechanicalSectionVariants}
            className="flex flex-col md:flex-row w-full min-h-[120vh] bg-white/50 backdrop-blur-sm"
            style={{ background: "linear-gradient(135deg, #027cc4, #0610ab)" }}
          >
            {/* Left Side - About Text */}
            <div className="w-full md:w-3/5 p-4 md:p-12 flex flex-col justify-center">
              <motion.h2
                variants={itemVariants}
                className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-200"
              >
                About MakerSpace
              </motion.h2>
              <motion.ul
                variants={textVariants}
                className="list-disc pl-4 md:pl-6 space-y-2 md:space-y-4 text-base md:text-lg text-gray-200"
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
                    believes in the principle,{" "}
                    <br className="hidden md:block"></br>
                    <strong>Curiosity-Connects-Creativity</strong>.
                  </span>
                </motion.li>
                {!isMobile && (
                  <>
                    <motion.li
                      variants={itemVariants}
                      className="flex items-start space-x-2"
                    >
                      <span>🌟</span>
                      <span>
                        MakerSpace encourages collaboration and teamwork,
                        fostering an environment where ideas are shared, and
                        creativity thrives through collective efforts.
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
                  </>
                )}
              </motion.ul>
            </div>

            {/* Right Side - TariffCards with Scroll Animation */}
            <motion.div
              style={{
                x: isMobile ? 0 : tariffCardX,
                opacity: tariffCardOpacity,
              }}
              className="w-full md:w-2/5 flex items-center justify-center py-8 md:py-0"
            >
              <TariffCards />
            </motion.div>
          </motion.div>

          {/* What we Offer section */}
          <div
            id="offer-section"
            ref={offersSectionRef}
            className="w-full min-h-screen bg-white/80 backdrop-blur-sm overflow-x-hidden"
          >
            <div className="container mx-auto px-4 md:px-8 py-16 md:py-28 h-auto flex flex-col items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 md:mb-36 bg-gradient-to-r from-[#027cc4] to-[#0610ab] text-transparent bg-clip-text">
                What we Offer!
                <span className="block w-24 md:w-32 h-1 bg-gradient-to-r from-[#027cc4] to-[#0610ab] mx-auto mt-2 rounded"></span>
              </h2>

              {/* Offer Cards - Responsive Layout */}
              <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-16 w-full">
                <OfferCard
                  title="State of the Art Machinery"
                  description="Access to cutting edge equipments for your projects"
                  icon={
                    <Cog
                      size={isMobile ? 48 : 64}
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
                      size={isMobile ? 48 : 64}
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
                      size={isMobile ? 48 : 64}
                      strokeWidth={1.5}
                      className={styles.machineIcon}
                    />
                  }
                />
              </div>
            </div>

            {/* MakerSpace Highlights Section */}
            <div className="w-full min-h-screen">
              <div className="container mx-auto px-4 md:px-8 py-10">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-10 bg-gradient-to-r from-[#027cc4] to-[#0610ab] text-transparent bg-clip-text">
                  MakerSpace Highlights
                  <span className="block w-24 md:w-32 h-1 bg-gradient-to-r from-[#027cc4] to-[#0610ab] mx-auto mt-2 rounded"></span>
                </h2>

                {/* Responsive Grid Layout */}
                {isMobile ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-6xl mx-auto">
                    <HomePageCard
                      title="TRAINING"
                      image="/images/training.jpg"
                      className="col-span-1 aspect-square"
                    />
                    <HomePageCard
                      title="PROJECTS"
                      image="/images/project.jpg"
                      className="col-span-1 aspect-square"
                    />
                    <HomePageCard
                      title="COMPETITIONS"
                      image="/images/competition.jpg"
                      className="col-span-1 aspect-square"
                    />
                    <HomePageCard
                      title="EXPO"
                      image="/images/expo2.png"
                      className="col-span-1 aspect-square"
                    />
                    <HomePageCard
                      title="VISITS"
                      image="/images/visits2.jpg"
                      className="col-span-1 aspect-square sm:col-span-2"
                    />
                    <HomePageCard
                      title="OUTREACH"
                      image="/images/outreach.jpg"
                      className="col-span-1 aspect-square sm:hidden"
                    />
                  </div>
                ) : isTablet ? (
                  <div
                    className="grid grid-cols-2 gap-6 max-w-6xl mx-auto"
                    style={{ gridTemplateRows: "repeat(6, 80px)" }}
                  >
                    <HomePageCard
                      title="TRAINING"
                      image="/images/training.jpg"
                      className="col-span-1 row-span-4"
                    />
                    <HomePageCard
                      title="PROJECTS"
                      image="/images/project.jpg"
                      className="col-span-1 row-span-3"
                    />
                    <HomePageCard
                      title="COMPETITIONS"
                      image="/images/competition.jpg"
                      className="col-span-1 row-span-2 row-start-5"
                    />
                    <HomePageCard
                      title="EXPO"
                      image="/images/expo2.png"
                      className="col-span-1 row-span-3 row-start-4"
                    />
                    <HomePageCard
                      title="VISITS"
                      image="/images/visits2.jpg"
                      className="col-span-2 row-span-2"
                    />
                    <HomePageCard
                      title="OUTREACH"
                      image="/images/outreach.jpg"
                      className="col-span-2 row-span-2 row-start-7"
                    />
                  </div>
                ) : (
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
                )}
              </div>
            </div>
            <div className="container mx-auto relative pb-6">
              <div className="flex justify-end">
                {isLoggedIn ? (
                  <Button
                    className="admin-button transition-all duration-300 hover:bg-white hover:text-[#0610ab] text-sm md:text-base"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    className="admin-button transition-all duration-300 hover:bg-white hover:text-[#0610ab] text-sm md:text-base"
                    onClick={handleGoogleLogin}
                  >
                    Admin Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
