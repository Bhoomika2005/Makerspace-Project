"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, BookOpen, Wrench, FileText, Image, Scroll, Phone, Menu, X } from "lucide-react"
import styles from "./Navbar.module.css"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  text: string
  isMobileMenuOpen: boolean
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, isMobileMenuOpen }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? styles.activeLink : ""}`}
    >
      {icon}
      <span className={isMobileMenuOpen ? "" : "hidden md:inline"}>{text}</span>
    </Link>
  )
}

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [isOfferSection, setIsOfferSection] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const header = document.querySelector("header")
    const headerHeight = header?.offsetHeight || 0

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const offerSection = document.getElementById("offer-section")

      setIsHeaderHidden(currentScrollY > headerHeight)

      if (offerSection) {
        const rect = offerSection.getBoundingClientRect()
        setIsOfferSection(rect.top <= 64 && rect.bottom >= 64)
      }
    }

    
    // handleResize()
    // handleScroll() 

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
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
  ]

  // Determine if the background should change
  const isSpecialPage = pathname === "/" || pathname === "/profile"

  return (
    <div className={styles.navbarContainer}>
      <div
        className={`${styles.navbar} ${isHeaderHidden ? styles.headerHidden : ""} ${isOfferSection ? styles.offerSection : ""} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
        style={{
          backgroundImage: isSpecialPage ? undefined : "linear-gradient(135deg, #027cc4, #0610ab)",
        }}
      >
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={isMobileMenuOpen ? styles.mobileNav : ""}>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              text={item.text}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Navbar