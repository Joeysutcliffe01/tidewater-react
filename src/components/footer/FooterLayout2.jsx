import { NavLink } from "react-router-dom";
import { useSite } from "../../context/SiteContext";
import styles from "./FooterLayout2.module.css";

const footerLinks = [
  { to: "/", label: "Intro" },
  { to: "/fishing", label: "Fishing" },
  { to: "/sightseeing", label: "Sightseeing" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact & Rates" },
];

// Three column layout
export default function FooterLayout2() {
  const { settings } = useSite();
  const { contactPhone, contactEmail } = settings.content;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* COL 1 — Brand */}
        <div className={styles.col}>
          <div className={styles.logoName}>Tidewater</div>
          <div className={styles.logoSub}>Fly Outfitters</div>
          <div className={styles.logoLocation}>South Freeport · Maine</div>
          <p className={styles.tagline}>
            Registered Maine Guide · Fully Insured
          </p>
        </div>

        {/* COL 2 — Nav links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <nav className={styles.links}>
            {footerLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={styles.link}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* COL 3 — Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact</h4>
          <p className={styles.contactItem}>
            <a href={`tel:${contactPhone.replace(/-/g, "")}`}>{contactPhone}</a>
          </p>
          <p className={styles.contactItem}>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
          <p className={styles.contactItem}>
            Strouts Point Wharf
            <br />
            South Freeport, ME
          </p>
        </div>
      </div>

      <div className={styles.copy}>
        © {new Date().getFullYear()} Tidewater Fly Outfitters LLC · All rights
        reserved
      </div>
    </footer>
  );
}
