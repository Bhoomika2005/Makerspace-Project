"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, BookOpen, Wrench, FileText, Image, Scroll, Phone, Menu, X } from "lucide-react"
import styles from "./Navbar.module.css"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  text: string
  isMobileMenuOpen: boolean
  isTablet: boolean
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, isMobileMenuOpen, isTablet }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 hover:text-blue-400 transition-colors ${
        isActive ? styles.activeLink : ""
      } ${isTablet ? styles.tabletNavItem : ""}`}
    >
      {icon}
      <span className={isMobileMenuOpen ? "" : isTablet ? styles.tabletNavText : "hidden md:inline"}>
        {text}
      </span>
    </Link>
  )
}

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [isOfferSection, setIsOfferSection] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [showMenuButton, setShowMenuButton] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const header = document.querySelector("header")
    const headerHeight = header?.offsetHeight || 0

    const handleResize = () => {
      const windowWidth = window.innerWidth
      setIsMobile(windowWidth < 768)
      setIsTablet(windowWidth >= 768 && windowWidth < 1024)
      
      if (windowWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const offerSection = document.getElementById("offer-section")

      // Set header hidden state
      setIsHeaderHidden(currentScrollY > headerHeight)

      // Handle menu button visibility on mobile
      if (isMobile) {
        // Hide menu button when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY.current && currentScrollY > headerHeight) {
          setShowMenuButton(false)
        } else {
          setShowMenuButton(true)
        }
        lastScrollY.current = currentScrollY
      }

      if (offerSection) {
        const rect = offerSection.getBoundingClientRect()
        setIsOfferSection(rect.top <= 64 && rect.bottom >= 64)
      }
    }

    handleResize()
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobile])

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
        className={`${styles.navbar} ${isHeaderHidden ? styles.headerHidden : ""} ${
          isOfferSection ? styles.offerSection : ""
        } ${isMobileMenuOpen ? styles.mobileMenuOpen : ""} ${isTablet ? styles.tabletNavbar : ""}`}
        style={{
          backgroundImage: isSpecialPage ? undefined : "linear-gradient(135deg, #027cc4, #0610ab)",
        }}
      >
        {(isMobile || isTablet) && showMenuButton && !isMobileMenuOpen && (
          <button 
            className={styles.mobileMenuButton} 
            onClick={() => setIsMobileMenuOpen(true)} 
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        )}

        {isMobileMenuOpen && (
          <button 
            className={styles.closeButton} 
            onClick={() => setIsMobileMenuOpen(false)} 
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        )}

        <nav className={isMobileMenuOpen ? styles.mobileNav : isTablet ? styles.tabletNav : ""}>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              text={item.text}
              isMobileMenuOpen={isMobileMenuOpen}
              isTablet={isTablet}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Navbar