"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation" // Import this to get the current path
import { Home, Users, BookOpen, Wrench, FileText, Image, UserCircle,Scroll, Phone } from "lucide-react"

import styles from "./Navbar.module.css"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  text: string
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text }) => (
  <Link href={href} className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
    {icon}
    <span>{text}</span>
  </Link>
)

const Navbar: React.FC = () => {
  const pathname = usePathname() // Get the current path
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [isOfferSection, setIsOfferSection] = useState(false)

  useEffect(() => {
    const header = document.querySelector("header")
    const headerHeight = header?.offsetHeight || 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const offerSection = document.getElementById("offer-section")

      setIsHeaderHidden(currentScrollY > headerHeight)

      if (offerSection) {
        const rect = offerSection.getBoundingClientRect()
        setIsOfferSection(rect.top <= 64 && rect.bottom >= 64)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { href: "/", icon: <Home size={20} />, text: "Home" },
    { href: "/course", icon: <BookOpen size={20} />, text: "Courses" },
    { href: "/projects", icon: <Scroll size={20} />, text: "Projects" },
    { href: "/machinery", icon: <Wrench size={20} />, text: "Utilities" },
    { href: "/forms", icon: <FileText size={20} />, text: "Forms" },
    { href: "/gallery", icon: <Image size={20} />, text: "Gallery" },
    { href: "/faculty", icon: <Users size={20} />, text: "People" },
    { href: "/contact", icon: <Phone size={20} />, text: "Contact" },
    // { href: "/profile", icon: <UserCircle size={20} />, text: "Profile" },
  ];

  // Determine if the background should change
  const isSpecialPage = pathname === "/" || pathname === "/profile"

  return (
    <div className={styles.navbarContainer}>
      <div
        className={`${styles.navbar} ${isHeaderHidden ? styles.headerHidden : ""} ${isOfferSection ? styles.offerSection : ""}`}
        style={{
          backgroundImage: isSpecialPage ? undefined : "linear-gradient(135deg, #027cc4, #0610ab)",
        }}
      >
        <nav>
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} icon={item.icon} text={item.text} />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Navbar
