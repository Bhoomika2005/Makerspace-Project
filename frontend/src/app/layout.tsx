// "use client";

// import { usePathname } from "next/navigation";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/header";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import TariffCards from "@/components/tariffCard";
// import { motion, AnimatePresence } from "framer-motion";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();

//   return (
//     <html lang="en" className="h-full">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative`}
//       >
//         <AnimatePresence mode="wait">
//           {pathname === "/" && (
//             <motion.div 
//               key="background"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="absolute inset-0 -z-10"
//             >
//               <div className="w-full h-screen relative bg-[white] flex">
//                 {/* Background Image */}
//                 <img
//                   src="/images/bg3.avif"
//                   alt="Background"
//                   className="w-full h-full object-cover absolute inset-0"
//                 />

//                 {/* Dark Overlay */}
//                 <div className="absolute inset-0 bg-black opacity-10"></div>

//                 {/* TariffCards Component - Left Aligned */}
//                 <motion.div 
//                   key="tariff-cards"
//                   initial={{ x: -100, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: -100, opacity: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="relative z-10 w-1/3 flex items-center justify-center pl-12"
//                 >
//                   <TariffCards />
//                 </motion.div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Header and Navbar */}
//         <Header />
//         <Navbar />

//         {/* Page Content After Background */}
//         <main className={`flex-grow ${pathname === "/" ? "mt-[100vh]" : ""}`}>
//           {children}
//         </main>

//         <Footer />
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your App",
  description: "App description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}