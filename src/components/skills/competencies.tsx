import { useCallback } from "react";
import styles from "./competencies.module.scss";

type CompetencyCardProps = {
  icon: string | React.ReactNode;
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

  return (
    <div className={styles.competencyCard} onMouseMove={handleMouseMove}>
      <span className={styles.cardIcon} aria-hidden="true">{icon}</span>
      <h4 className={styles.cardTitle}>{title}</h4>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

export function Competencies() {
  return (
    <div className={styles.competencies}>
      <CompetencyCard
        icon="{ }"
        title="Build Complex Web Apps"
        description="Develop and maintain scalable web applications using modern JS ecosystems (Vue, React, AEM). I transform complex business logic into robust, maintainable frontend architectures with a strong focus on core web fundamentals."
      />
      <CompetencyCard
        icon="✦"
        title="Craft Premium UI/UX"
        description="Deliver reasonably pixel-perfect, rich-media interfaces. I act as the technical bridge between design and code to create visually stunning, strictly accessible (WCAG compliant) experiences that adapt flawlessly across devices."
      />
      <CompetencyCard
        icon="▣"
        title="Drive Prototyping & Flows"
        description="Translate abstract business requirements into actionable engineering plans. I create wireframes, define logical user flows, and build interactive HTML prototypes to validate ideas before heavy development begins."
      />
      <CompetencyCard
        icon="⚐"
        title="Lead as a &ldquo;Player-Coach&rdquo;"
        description="Manage Agile teams, establish CI/CD workflows, and enforce objective code quality metrics. My true passion remains in the codebase&mdash;leading by example, mentoring peers, and crafting the real product alongside my team."
      />
    </div>
  );
}
