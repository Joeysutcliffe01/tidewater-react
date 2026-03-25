import { useSite } from "../../context/SiteContext";
import styles from "./FooterLayout1.module.css";
import logoFull from "../../assets/svg/TIDE-001 TIDEWATER LOGO  (1).svg";
import maineBadge from "../../assets/svg/maine-guide.svg";

export default function FooterLayout1() {
  const { settings } = useSite();
  const { contactPhone, contactEmail } = settings.content;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* LEFT — Full logo */}
        <div className={styles.logoCol}>
          <img
            src={logoFull}
            alt="Tidewater Fly Outfitters"
            className={styles.logoImg}
          />
        </div>

        {/* CENTER — Legal + contact */}
        <div className={styles.legalCol}>
          <p className={styles.legal}>
            Tidewater Fly Outfitters is a Maine registered LLC and is fully
            insured.
          </p>
          <p className={styles.legal}>
            Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            {"  "}·{"  "}
            Call or text:{" "}
            <a href={`tel:${contactPhone.replace(/-/g, "")}`}>{contactPhone}</a>
          </p>
        </div>

        {/* RIGHT — Maine Guide badge */}
        <div className={styles.badgeCol}>
          <img
            src={maineBadge}
            alt="Registered Maine Guide"
            className={styles.badgeImg}
          />
        </div>
      </div>

      <div className={styles.copy}>
        © {new Date().getFullYear()} Tidewater Fly Outfitters LLC · All rights
        reserved
      </div>
    </footer>
  );
}
