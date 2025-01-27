import Image from "next/image"
import Link from "next/link"
import styles from "./HomePageCard.module.css"

interface HomePageCardProps {
  title: string
  image: string
  className?: string
}

const HomePageCard = ({ title, image, className = "" }: HomePageCardProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.card}>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        <div className={styles.info}>
          <h1>{title}</h1>
          <Link href="/gallery">
            <button>View More</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePageCard

