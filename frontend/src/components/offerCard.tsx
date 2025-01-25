import React from "react"
import styles from "./offerCard.module.css"

interface OfferCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export default function OfferCard({ title, description, icon }: OfferCardProps) {
  return (
    <div className={styles.cardm}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          {React.cloneElement(icon as React.ReactElement, {
            className: styles.machineIcon,
          })}
        </div>
      </div>

      <div className={styles.card2}>
        <div className={styles.upper}>
          <div className={styles.titleText}>{title}</div>
        </div>

        <div className={styles.lower}>
          <div className={styles.descriptionText}>{description}</div>
        </div>
      </div>
    </div>
  )
}

