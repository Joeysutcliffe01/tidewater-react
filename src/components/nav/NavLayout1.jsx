import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavLayout1.module.css";

const navLinks = [
  { to: "/", label: "Intro" },
  { to: "/fishing", label: "Fishing" },
  { to: "/sightseeing", label: "Sightseeing" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact & Rates" },
];

export default function NavLayout1() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        {/* LOGO — matches PDF exactly */}
        <NavLink to="/" className={styles.logo}>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Tidewater</span>
            <span className={styles.logoSub}>Fly Outfitters</span>
          </div>
        </NavLink>

        {/* DESKTOP LINKS */}
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

      {/* MOBILE MENU */}
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
