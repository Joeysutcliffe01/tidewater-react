import { useState } from "react";
import { useSite } from "../context/SiteContext";
import styles from "./Contact.module.css";
import logoFull from "../assets/svg/TIDE-001 TIDEWATER LOGO  (1).svg";

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
    position: "center",
    brightness: 0.65,
  };

  const [submitted, setSubmitted] = useState(false);

  const heroBgStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: contactHero.url
      ? `url('${contactHero.url}')`
      : "linear-gradient(135deg, #1a2744 0%, #243358 100%)",
    backgroundSize: "cover",
    backgroundPosition: contactHero.position,
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
            {/* <div className={styles.logoLocation}>South Freeport · Maine</div> */}
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
        <div className={styles.formInner}>
          <h2 className={styles.formTitle}>Send a Message</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="First and last name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Phone</label>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder="(207) 000-0000"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Trip Type</label>
                <select className={styles.input}>
                  <option value="">Select…</option>
                  <option>Fly Fishing — {rate1Price} / {rate1Duration}</option>
                  <option>Sightseeing — {rate2Price} / {rate2Duration}</option>
                  <option>Other / Questions</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Preferred Dates</label>
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. June 15–20, flexible"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                className={styles.textarea}
                placeholder="Experience level, group size, questions…"
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
            {submitted && (
              <p className={styles.successMsg}>
                Thank you — Rod will be in touch shortly!
              </p>
            )}
          </form>
        </div>
      </section> */}
    </main>
  );
}
