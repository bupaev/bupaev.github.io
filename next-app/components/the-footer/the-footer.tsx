import { GoToTop } from "@/components/go-to-top";
import styles from "./the-footer.module.scss";

export function TheFooter() {
  return (
    <footer className={`footer is-size-5 ${styles.footer}`}>
      <GoToTop />
      <div className={styles.text}>
        <span>
          Made with{" "}
          <a
            href="https://github.com/bupaev/bupaev.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            love and Next.js
          </a>
        </span>
      </div>
      <GoToTop />
    </footer>
  );
}
