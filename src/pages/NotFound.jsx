import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Sorry, no bites.</h1>
        <p className={styles.sub}>
          The page you are looking for does not exist.
        </p>
        <Link to="/" className={styles.btn}>
          Return Home
        </Link>
      </div>
    </main>
  );
}
