import { useState, useEffect } from "react";
import { useSite } from "../../context/SiteContext";
import styles from "./EditorPanel.module.css";

function Section({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.section}>
      <button className={styles.sectionHead} onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange }) {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function TextArea({ value, onChange }) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function ImageFields({ imageKey }) {
  const { settings, updateImage } = useSite();
  const img = settings.images[imageKey];

  const hPos = img.position.includes("left")
    ? "left"
    : img.position.includes("right")
      ? "right"
      : "center";

  const setHPos = (h) => updateImage(imageKey, "position", `${h} center`);

  return (
    <>
      <Field label="Image URL (from Cloudinary)">
        <TextInput
          value={img.url}
          onChange={(v) => updateImage(imageKey, "url", v)}
        />
      </Field>
      <Field label="Focus">
        <div className={styles.layoutBtns}>
          {["left", "center", "right"].map((h) => (
            <button
              key={h}
              className={
                hPos === h
                  ? `${styles.layoutBtn} ${styles.layoutActive}`
                  : styles.layoutBtn
              }
              onClick={() => setHPos(h)}
            >
              {h.charAt(0).toUpperCase() + h.slice(1)}
            </button>
          ))}
        </div>
      </Field>
      <Field label={`Brightness: ${img.brightness}`}>
        <input
          className={styles.range}
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={img.brightness}
          onChange={(e) =>
            updateImage(imageKey, "brightness", parseFloat(e.target.value))
          }
        />
      </Field>
    </>
  );
}

export default function EditorPanel({ onClose }) {
  const { settings, updateSetting, updateContent, updateColor, resetSettings } =
    useSite();
  const { content, colors } = settings;
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(t);
  }, [settings]);

  function handleReset() {
    if (window.confirm("Reset all changes? This cannot be undone.")) {
      resetSettings();
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Site Editor</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {saved && <span className={styles.savedBadge}>✓ Saved</span>}
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {/* ── BRANDING ── */}
        <Section title="🎨 Branding">
          <Field label="Nav Layout">
            <div className={styles.layoutBtns}>
              <button
                className={
                  settings.navLayout === 1
                    ? `${styles.layoutBtn} ${styles.layoutActive}`
                    : styles.layoutBtn
                }
                onClick={() => updateSetting("navLayout", 1)}
              >
                Option 1<br />
                <small>Logo left, links right</small>
              </button>
              <button
                className={
                  settings.navLayout === 2
                    ? `${styles.layoutBtn} ${styles.layoutActive}`
                    : styles.layoutBtn
                }
                onClick={() => updateSetting("navLayout", 2)}
              >
                Option 2<br />
                <small>Centered logo</small>
              </button>
            </div>
          </Field>
          <Field label="Footer Layout">
            <div className={styles.layoutBtns}>
              <button
                className={
                  settings.footerLayout === 1
                    ? `${styles.layoutBtn} ${styles.layoutActive}`
                    : styles.layoutBtn
                }
                onClick={() => updateSetting("footerLayout", 1)}
              >
                Option 1<br />
                <small>Logo + legal</small>
              </button>
              <button
                className={
                  settings.footerLayout === 2
                    ? `${styles.layoutBtn} ${styles.layoutActive}`
                    : styles.layoutBtn
                }
                onClick={() => updateSetting("footerLayout", 2)}
              >
                Option 2<br />
                <small>Three columns</small>
              </button>
            </div>
          </Field>
          <Field label="Navy Color">
            <div className={styles.colorRow}>
              <input
                type="color"
                value={colors.navy}
                onChange={(e) => updateColor("navy", e.target.value)}
                className={styles.colorPicker}
              />
              <span className={styles.colorVal}>{colors.navy}</span>
            </div>
          </Field>
          <Field label="Gold Color">
            <div className={styles.colorRow}>
              <input
                type="color"
                value={colors.gold}
                onChange={(e) => updateColor("gold", e.target.value)}
                className={styles.colorPicker}
              />
              <span className={styles.colorVal}>{colors.gold}</span>
            </div>
          </Field>
        </Section>

        {/* ── INTRO PAGE ── */}
        <Section title="📄 Intro Page">
          <p className={styles.sectionNote}>Hero Image</p>
          <ImageFields imageKey="introHero" />
          <Field label="Hero Quote">
            <TextArea
              value={content.heroQuote}
              onChange={(v) => updateContent("heroQuote", v)}
            />
          </Field>
          <Field label="Hero Tagline">
            <TextInput
              value={content.heroTagline}
              onChange={(v) => updateContent("heroTagline", v)}
            />
          </Field>
          <p className={styles.sectionNote}>Fish Photo (full width)</p>
          <ImageFields imageKey="fishPhoto" />
          <p className={styles.sectionNote}>Guide Photo</p>
          <ImageFields imageKey="guidePhoto" />
          <p className={styles.sectionNote}>Boat Photo</p>
          <ImageFields imageKey="boatPhoto" />
          <Field label="About Body Text">
            <TextArea
              value={content.aboutBody}
              onChange={(v) => updateContent("aboutBody", v)}
            />
          </Field>
        </Section>

        {/* ── FISHING PAGE ── */}
        <Section title="🎣 Fishing Page">
          <p className={styles.sectionNote}>Hero Image</p>
          <ImageFields imageKey="fishingHero" />
          <Field label="Section Title">
            <TextInput
              value={content.fishingTitle}
              onChange={(v) => updateContent("fishingTitle", v)}
            />
          </Field>
          <Field label="Body Text">
            <TextArea
              value={content.fishingBody}
              onChange={(v) => updateContent("fishingBody", v)}
            />
          </Field>
        </Section>

        {/* ── SIGHTSEEING PAGE ── */}
        <Section title="🌊 Sightseeing Page">
          <p className={styles.sectionNote}>Hero Image</p>
          <ImageFields imageKey="sightseeingHero" />
          <Field label="Section Title">
            <TextInput
              value={content.sightTitle}
              onChange={(v) => updateContent("sightTitle", v)}
            />
          </Field>
          <Field label="Body Text">
            <TextArea
              value={content.sightBody}
              onChange={(v) => updateContent("sightBody", v)}
            />
          </Field>
        </Section>

        {/* ── GALLERY PAGE ── */}
        <Section title="🖼 Gallery Page">
          <p className={styles.sectionNote}>Hero Image</p>
          <ImageFields imageKey="galleryHero" />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div key={n}>
              <p className={styles.sectionNote}>Photo {n}</p>
              <ImageFields imageKey={`galleryPhoto${n}`} />
              <Field label="Caption">
                <TextInput
                  value={content[`galleryCaption${n}`] ?? ""}
                  onChange={(v) => updateContent(`galleryCaption${n}`, v)}
                />
              </Field>
            </div>
          ))}
        </Section>

        {/* ── CONTACT PAGE ── */}
        <Section title="📞 Contact & Rates">
          <p className={styles.sectionNote}>Hero Image</p>
          <ImageFields imageKey="contactHero" />
          <Field label="Phone">
            <TextInput
              value={content.contactPhone}
              onChange={(v) => updateContent("contactPhone", v)}
            />
          </Field>
          <Field label="Email">
            <TextInput
              value={content.contactEmail}
              onChange={(v) => updateContent("contactEmail", v)}
            />
          </Field>
          <Field label="Fishing Price">
            <TextInput
              value={content.rate1Price}
              onChange={(v) => updateContent("rate1Price", v)}
            />
          </Field>
          <Field label="Fishing Duration">
            <TextInput
              value={content.rate1Duration}
              onChange={(v) => updateContent("rate1Duration", v)}
            />
          </Field>
          <Field label="Sightseeing Price">
            <TextInput
              value={content.rate2Price}
              onChange={(v) => updateContent("rate2Price", v)}
            />
          </Field>
          <Field label="Sightseeing Duration">
            <TextInput
              value={content.rate2Duration}
              onChange={(v) => updateContent("rate2Duration", v)}
            />
          </Field>
        </Section>

        {/* ── DANGER ZONE ── */}
        <Section title="⚠️ Danger Zone">
          <p className={styles.sectionNote}>
            This will reset ALL changes back to defaults.
          </p>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset Everything
          </button>
        </Section>
      </div>
    </div>
  );
}
