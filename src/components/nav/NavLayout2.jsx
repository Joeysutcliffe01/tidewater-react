import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavLayout2.module.css";

const navLinks = [
  { to: "/", label: "Intro" },
  { to: "/fishing", label: "Fishing" },
  { to: "/sightseeing", label: "Sightseeing" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact & Rates" },
];

export default function NavLayout2() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        {/* CENTERED LOGO */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoName}>Tidewater</span>
          <span className={styles.logoDivider}>·</span>
          <span className={styles.logoSub}>Fly Outfitters</span>
          <span className={styles.logoDivider}>·</span>
          <span className={styles.logoLocation}>South Freeport, ME</span>
        </NavLink>

        {/* CENTERED LINKS below logo */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* HAMBURGER */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileLink} ${styles.active}`
                  : styles.mobileLink
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
