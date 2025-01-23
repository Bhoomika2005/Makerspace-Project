"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Home,
  Users,
  BookOpen,
  Wrench,
  FileText,
  Image,
  UserCircle
} from 'lucide-react'
import styles from './Navbar.module.css'

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text }) => (
  <Link 
    href={href} 
    className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
)

const Navbar: React.FC = () => {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    const headerHeight = header?.offsetHeight || 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if header is completely out of view
      setIsHeaderHidden(currentScrollY > headerHeight);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { href: '/', icon: <Home size={20} />, text: 'Home' },
    { href: '/faculty', icon: <Users size={20} />, text: 'Faculty' },
    { href: '/course', icon: <BookOpen size={20} />, text: 'Courses' },
    { href: '/machinery', icon: <Wrench size={20} />, text: 'Machinery' },
    { href: '/forms', icon: <FileText size={20} />, text: 'Forms' },
    { href: '/gallery', icon: <Image size={20} />, text: 'Gallery' },
    { href: '/profile', icon: <UserCircle size={20} />, text: 'Profile' }
  ]

  return (
    
    <div className={styles.navbarContainer}>
      <div className={`${styles.navbar} ${isHeaderHidden ? styles.headerHidden : ''}`}>
        <nav>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </nav>
        <span className={styles.decor1}></span>
        <span className={styles.decor2}></span>
      </div>
    </div>
  )
}

export default Navbar