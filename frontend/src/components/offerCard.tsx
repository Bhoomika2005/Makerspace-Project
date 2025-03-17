"use client"

import React, { useEffect, useState } from "react"
import styles from "./OfferCard.module.css"

interface OfferCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export default function OfferCard({ title, description, icon }: OfferCardProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCardClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <div 
      className={`${styles.cardm} ${isMobile ? styles.mobileCardm : ""}`}
      onClick={handleCardClick}
    >
      <div className={`${styles.card} ${isMobile ? styles.mobileCard : ""} ${isFlipped ? styles.flipped : ""}`}>
        <div className={styles.iconContainer}>
          {React.cloneElement(icon as React.ReactElement, {
            className: styles.machineIcon,
          })}
        </div>
      </div>

      <div className={`${styles.card2} ${isMobile ? styles.mobileCard2 : ""} ${isFlipped ? styles.flipped : ""}`}>
        <div className={styles.upper}>
          <div className={`${styles.titleText} ${isMobile ? styles.mobileTitleText : ""}`}>{title}</div>
        </div>
        <div className={styles.lower}>
          <div className={`${styles.descriptionText} ${isMobile ? styles.mobileDescriptionText : ""}`}>
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

