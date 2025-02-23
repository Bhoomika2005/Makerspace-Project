import React from "react";
import { Telescope, Link, Zap } from "lucide-react";
import styles from "./TariffCards.module.css";

const TariffCards: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tariffCards}>
        <div className={`${styles.card} ${styles.economy}`}>
          <div className="flex flex-col items-center justify-center">
            <Telescope className="text-gray-200" size={96} strokeWidth={1.5} />
            <h3 className="text-2xl font-semibold mb-2 text-center">Curiosity</h3>
            <span className="text-gray-600 text-center">...........</span>
          </div>
        </div>
        <div className={`${styles.card} ${styles.premiumeconomy}`}>
          <div className="flex flex-col items-center justify-center">
            <Link className="text-gray-200" size={96} strokeWidth={1.5} />
            <h3 className="text-2xl font-semibold mb-2 text-center">Connects</h3>
            <span className="text-gray-600 text-center">...........</span>
          </div>
        </div>
        <div className={`${styles.card} ${styles.business}`}>
          <div className="flex flex-col items-center justify-center">
            <Zap className="text-gray-200" size={96} strokeWidth={1.5} />
            <h3 className="text-2xl font-semibold mb-2 text-center">Creativity</h3>
            <span className="text-gray-600 text-center">...........</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffCards;
