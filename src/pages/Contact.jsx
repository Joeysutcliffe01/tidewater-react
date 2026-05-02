import { useEffect, useState } from "react";
import { useSite } from "../context/SiteContext";
import styles from "./Contact.module.css";
import logoFull from "../assets/svg/TIDEWATER-LOGO-NURO-FONT .png";

export default function Contact() {
  const { settings } = useSite();
  const {
    contactPhone,
    contactEmail,
    rate1Price,
    rate1Duration,
    rate2Price,
    rate2Duration,
  } = settings.content;

  const contactHero = settings.images?.contactHero ?? {
    url: "",
    position: "center 40%",
    brightness: 0.65,
  };

  const [submitted, setSubmitted] = useState(false);

  // Responsive hero position: center right on mobile (≤611px), SiteContext value above
  const [heroPosition, setHeroPosition] = useState(
    window.innerWidth <= 611 ? "center right" : contactHero.position,
  );

  useEffect(() => {
    const handleResize = () => {
      setHeroPosition(
        window.innerWidth <= 611 ? "center right" : contactHero.position,
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [contactHero.position]);

  const heroBgStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: contactHero.url
      ? `url('${contactHero.url}')`
      : "linear-gradient(135deg, #1a2744 0%, #243358 100%)",
    backgroundSize: "cover",
    backgroundPosition: heroPosition, // ← responsive value
    backgroundRepeat: "no-repeat",
    filter: `brightness(${contactHero.brightness})`,
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    e.target.reset();
  }

  return (
    <main className={styles.main}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={heroBgStyle} />
        <div className={styles.heroContent}>
          <div className={styles.heroBox}>
            <p className={styles.heroTitle}>Contact & Rates</p>
          </div>
        </div>
      </section>

      {/* ── RATES + LOGO SECTION ── */}
      <section className={styles.ratesSection}>
        <div className={styles.ratesInner}>
          {/* LOGO IMAGE */}
          <div className={styles.logoWrap}>
            <img
              src={logoFull}
              alt="Tidewater Fly Outfitters"
              className={styles.logoImg}
            />
          </div>

          {/* RATES */}
          <div className={styles.rates}>
            <p className={styles.rateRow}>
              <strong>Fishing:</strong> {rate1Duration} — {rate1Price}
            </p>
            <p className={styles.rateRow}>
              <strong>Sightseeing:</strong> {rate2Duration} — {rate2Price}
            </p>
            <p className={styles.rateNote}>
              <em>Call for rates for trips of shorter duration.</em>
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className={styles.contactInfo}>
            <p className={styles.contactText}>
              Connect with me by phone, text or email to book your trip or if
              you have questions.
            </p>
            <p className={styles.contactText}>
              I will send you all the information you need prior to your trip.
            </p>
            <p className={styles.contactDetail}>
              <strong>Call or text:</strong>{" "}
              <a href={`tel:${contactPhone.replace(/-/g, "")}`}>
                {contactPhone}
              </a>
            </p>
            <p className={styles.contactDetail}>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          </div>
        </div>

        {/* GOLD DIVIDER */}
        <div className={styles.divider} />
      </section>

      {/* ── CONTACT FORM — hidden for now, re-enable when ready ── */}
      {/* <section className={styles.formSection}>
        ...
      </section> */}
    </main>
  );
}
