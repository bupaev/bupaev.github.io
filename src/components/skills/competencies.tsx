import { useCallback } from "react";
import styles from "./competencies.module.scss";

import applicationIcon from "./icons/application.svg";
import diamondIcon from "./icons/diamond.svg";
import rocketIcon from "./icons/rocket.svg";
import handsIcon from "./icons/hands.svg";

type CompetencyCardProps = {
  icon: string | { src: string }; 
  title: string;
  description: string;
};

function CompetencyCard({ icon, title, description }: CompetencyCardProps) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  }, []);

  const iconSrc = typeof icon === "string" ? icon : icon?.src;

  return (
    <div className={styles.competencyCard} onMouseMove={handleMouseMove}>
      <span 
        className={styles.cardIcon} 
        aria-hidden="true" 
        style={{ "--icon-url": `url('${iconSrc}')` } as React.CSSProperties}
      />
      <h4 className={styles.cardTitle}>{title}</h4>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

export function Competencies() {
  return (
    <div className={styles.competencies}>
      <CompetencyCard
        icon={applicationIcon}
        title="Build Complex Web Apps"
        description="I apply 15+ years of hands-on experience to solve complex challenges, transforming heavy logic into responsive, robust frontend applications"
      />
      <CompetencyCard
        icon={diamondIcon}
        title="Craft Premium UI/UX"
        description="Translate ambitious designs into polished interfaces, merging technical execution with artistic vision to elevate the final user experience"
      />
      <CompetencyCard
        icon={rocketIcon}
        title="Drive End-to-End Delivery"
        description="Drive the complete product lifecycle from initial idea to final impact, stepping into any necessary role to ensure high quality and meet deadlines"
      />
      <CompetencyCard
        icon={handsIcon}
        title="Lead as a Player-Coach"
        description="Lead as a practitioner, guiding lean dev teams from the trenches by writing production code and mentoring through hands-on execution"
      />
    </div>
  );
}
