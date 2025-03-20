"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Telescope, Link, Zap } from "lucide-react";
import styles from "./TariffCards.module.css";

const TariffCards: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check if device is touch-enabled
    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    // Initial checks
    handleResize();
    if (isTouchDevice()) {
      document.documentElement.classList.add("touch-device");
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle touch interactions
  const handleCardTouch = (cardId: string) => {
    if (isMobile) {
      if (activeCard === cardId) {
        setActiveCard(null);
      } else {
        setActiveCard(cardId);
      }
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${isMobile ? styles.mobileWrapper : ""}`}
    >
      <div
        className={`${styles.tariffCards} ${
          isMobile ? styles.mobileTariffCards : ""
        }`}
      >
        <div
          className={`${styles.card} ${styles.economy} ${
            isMobile ? styles.mobileCard : ""
          } ${activeCard === "economy" ? styles.active : ""}`}
          onClick={() => handleCardTouch("economy")}
          onTouchStart={() => handleCardTouch("economy")}
        >
          <div className="flex flex-col items-center justify-center">
            <Telescope
              className="text-gray-200"
              size={isMobile ? 64 : 96}
              strokeWidth={1.5}
            />
            <h3
              className={`text-xl md:text-2xl font-semibold mb-2 text-center ${
                isMobile ? "mt-2" : ""
              }`}
            >
              Curiosity
            </h3>
            <span className="text-gray-600 text-center">...........</span>
          </div>
        </div>
        <div
          className={`${styles.card} ${styles.premiumeconomy} ${
            isMobile ? styles.mobileCard : ""
          } ${activeCard === "premiumeconomy" ? styles.active : ""}`}
          onClick={() => handleCardTouch("premiumeconomy")}
          onTouchStart={() => handleCardTouch("premiumeconomy")}
        >
          <div className="flex flex-col items-center justify-center">
            <Link
              className="text-gray-200"
              size={isMobile ? 64 : 96}
              strokeWidth={1.5}
            />
            <h3
              className={`text-xl md:text-2xl font-semibold mb-2 text-center ${
                isMobile ? "mt-2" : ""
              }`}
            >
              Connects
            </h3>
            <span className="text-gray-600 text-center">...........</span>
          </div>
        </div>
        <div
          className={`${styles.card} ${styles.business} ${
            isMobile ? styles.mobileCard : ""
          } ${activeCard === "business" ? styles.active : ""}`}
          onClick={() => handleCardTouch("business")}
          onTouchStart={() => handleCardTouch("business")}
        >
          <div className="flex flex-col items-center justify-center">
            <Zap
              className="text-gray-200"
              size={isMobile ? 64 : 96}
              strokeWidth={1.5}
            />
            <h3
              className={`text-xl md:text-2xl font-semibold mb-2 text-center ${
                isMobile ? "mt-2" : ""
              }`}
            >
              Creativity
            </h3>
            <span className="text-gray-600 text-center">...........</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffCards;
