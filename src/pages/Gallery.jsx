import { useState, useEffect, useCallback } from "react";
import { useSite } from "../context/SiteContext";
import styles from "./Gallery.module.css";

const PHOTO_LABELS = [
  "Bent rod, fish on",
  "Fish and yellow fly",
  "On the water",
  "Go get bigger",
  "Rocky coast of Maine",
  "Pound of Tea Island",
  "Crab Island Ledge",
  "Dawn on the bay",
  "Deer swimming between islands",
];

export default function Gallery() {
  const { settings } = useSite();
  const [lightboxIdx, setLightboxIdx] = useState(null); // null = closed
  const [animDir, setAnimDir] = useState(null); // 'left' | 'right' | null
  const [animating, setAnimating] = useState(false);

  const galleryHero = settings.images?.galleryHero ?? {
    url: "",
    position: "center right",
    brightness: 0.55,
  };

  const photos = PHOTO_LABELS.map((label, i) => {
    const key = `galleryPhoto${i + 1}`;
    const photo = settings.images?.[key] ?? {
      url: "",
      position: "center right", // ← was "center"
      brightness: 1,
    };
    return { key, label, photo };
  });

  // Only photos with a URL participate in the lightbox
  const visiblePhotos = photos.filter((p) => p.photo.url);

  // ── Lightbox navigation ──────────────────────────────────────────────
  const navigate = useCallback(
    (dir) => {
      if (animating || lightboxIdx === null) return;
      const next =
        (lightboxIdx + dir + visiblePhotos.length) % visiblePhotos.length;
      setAnimDir(dir === 1 ? "left" : "right");
      setAnimating(true);
      setTimeout(() => {
        setLightboxIdx(next);
        setAnimDir(null);
        setAnimating(false);
      }, 320);
    },
    [animating, lightboxIdx, visiblePhotos.length],
  );

  const openLightbox = (idx) => {
    setLightboxIdx(idx);
    setAnimDir(null);
  };

  const closeLightbox = () => setLightboxIdx(null);

  // Keyboard nav
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, navigate]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIdx]);

  // ── Derived styles ───────────────────────────────────────────────────
  const heroBgStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: galleryHero.url ? `url('${galleryHero.url}')` : "none",
    backgroundSize: "cover",
    backgroundPosition: galleryHero.position,
    backgroundRepeat: "no-repeat",
    filter: `brightness(${galleryHero.brightness})`,
  };

  const currentPhoto = lightboxIdx !== null ? visiblePhotos[lightboxIdx] : null;

  const lbImgClass = [
    styles.lbImg,
    animDir === "left" ? styles.lbSlideLeft : "",
    animDir === "right" ? styles.lbSlideRight : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={styles.main}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={heroBgStyle} />
        <div className={styles.heroContent}>
          <div className={styles.heroBox}>
            <p className={styles.heroTitle}>Images from the Bay</p>
          </div>
        </div>
      </section>

      {/* ── PHOTO GRID ── */}
      <section className={styles.grid}>
        {photos.map(({ key, label, photo }) => {
          const visIdx = visiblePhotos.findIndex((p) => p.key === key);

          const cellStyle = {
            backgroundImage: photo.url ? `url('${photo.url}')` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center right", // ← hardcoded; ignores stale SiteContext value
            backgroundRepeat: "no-repeat",
            filter: `brightness(${photo.brightness})`,
            cursor: photo.url ? "pointer" : "default",
          };
          return (
            <div
              key={key}
              className={styles.cell}
              style={cellStyle}
              onClick={() => photo.url && openLightbox(visIdx)}
              role={photo.url ? "button" : undefined}
              aria-label={photo.url ? `View ${label}` : undefined}
              tabIndex={photo.url ? 0 : undefined}
              onKeyDown={
                photo.url
                  ? (e) => e.key === "Enter" && openLightbox(visIdx)
                  : undefined
              }
            >
              {!photo.url && (
                <span className={styles.placeholder}>{label}</span>
              )}
              {photo.url && <div className={styles.cellOverlay} />}
            </div>
          );
        })}
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIdx !== null && currentPhoto && (
        <div
          className={styles.lbBackdrop}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            className={styles.lbClose}
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Counter */}
          <div className={styles.lbCounter}>
            {lightboxIdx + 1} / {visiblePhotos.length}
          </div>

          {/* Prev arrow */}
          <button
            className={`${styles.lbArrow} ${styles.lbPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image — key prop forces remount so animation re-fires each slide */}
          <div
            className={styles.lbImgWrap}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={currentPhoto.key}
              className={lbImgClass}
              src={currentPhoto.photo.url}
              alt={currentPhoto.label}
              draggable={false}
            />
          </div>

          {/* Next arrow */}
          <button
            className={`${styles.lbArrow} ${styles.lbNext}`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            aria-label="Next"
          >
            ›
          </button>

          {/* Caption */}
          <p className={styles.lbCaption}>{currentPhoto.label}</p>
        </div>
      )}
    </main>
  );
}
