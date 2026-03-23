import { NavLink } from "react-router-dom";
import { useSite } from "../../context/SiteContext";
import styles from "./FooterLayout1.module.css";

// PDF match — logo + legal + contact centered
export default function FooterLayout1() {
  const { settings } = useSite();
  const { contactPhone, contactEmail } = settings.content;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* LEFT — Logo */}
        <div className={styles.logoCol}>
          <div className={styles.logoName}>Tidewater</div>
          <div className={styles.logoSub}>Fly Outfitters</div>
          <div className={styles.logoLocation}>South Freeport · Maine</div>
        </div>

        {/* CENTER — Legal */}
        <div className={styles.legalCol}>
          <p className={styles.legal}>
            Tidewater Fly Outfitters is a Maine registered LLC and is fully
            insured.
          </p>
          <p className={styles.legal}>
            Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
          <p className={styles.legal}>
            Call or text:{" "}
            <a href={`tel:${contactPhone.replace(/-/g, "")}`}>{contactPhone}</a>
          </p>
        </div>

        {/* RIGHT — Badge */}
        <div className={styles.badgeCol}>
          <span className={styles.badge}>
            Registered
            <br />
            Maine Guide
          </span>
        </div>
      </div>

      <div className={styles.copy}>
        © {new Date().getFullYear()} Tidewater Fly Outfitters LLC · All rights
        reserved
      </div>
    </footer>
  );
}
