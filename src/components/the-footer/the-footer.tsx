import { GoToTop } from "@/components/go-to-top";
import styles from "./the-footer.module.scss";

export function TheFooter() {
  return (
    <footer className={`footer ${styles.footer}`}>
      <GoToTop />
      <div className={styles.text}>
        <span>
          Made with&nbsp;
          <a
            href="https://github.com/bupaev/bupaev.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            love and <s>Nuxt</s> <s>Next.js</s> Astro
          </a>
          <br />&copy; 2021-2026
        </span>
      </div>
      <GoToTop />
    </footer>
  );
}
