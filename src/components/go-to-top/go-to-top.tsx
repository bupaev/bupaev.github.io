"use client";

import styles from "./go-to-top.module.scss";

export function GoToTop() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.goToTop} onClick={handleClick}>
      <div className={styles.arrow} />
      <div className={styles.arrow} />
      <div className={styles.arrow} />
    </div>
  );
}
