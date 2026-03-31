import { useState, useEffect, useCallback } from "react";
import { useSite } from "../context/SiteContext";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const { settings } = useSite();
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [prevIdx, setPrevIdx] = useState(null);
  const [animDir, setAnimDir] = useState(null);
  const [animating, setAnimating] = useState(false);

  const galleryHero = settings.images?.galleryHero ?? {
    url: "",
    position: "center right",
    brightness: 0.55,
  };

  // Build photos array from SiteContext — captions editable via admin
  const photos = Array.from({ length: 9 }, (_, i) => {
    const n = i + 1;
    const key = `galleryPhoto${n}`;
    const photo = settings.images?.[key] ?? {
      url: "",
      position: "center",
      brightness: 1,
    };
    const label = settings.content?.[`galleryCaption${n}`] ?? `Photo ${n}`;
    return { key, label, photo };
  });

  const visiblePhotos = photos.filter((p) => p.photo.url);

  // ── Lightbox navigation ──────────────────────────────────────────────
  const navigate = useCallback(
    (dir) => {
      if (animating || lightboxIdx === null) return;
      const next =
        (lightboxIdx + dir + visiblePhotos.length) % visiblePhotos.length;
      setLightboxIdx(next);
      setPrevIdx(null);
      setAnimDir(null);
      setAnimating(false);
    },
    [animating, lightboxIdx, visiblePhotos.length],
  );

  const openLightbox = (idx) => {
    setLightboxIdx(idx);
    setPrevIdx(null);
    setAnimDir(null);
  };
  const closeLightbox = () => {
    setLightboxIdx(null);
    setPrevIdx(null);
    setAnimDir(null);
  };

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

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIdx]);

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
  const prevPhoto = prevIdx !== null ? visiblePhotos[prevIdx] : null;

  const inClass = [
    styles.lbImg,
    animDir === "left" ? styles.lbSlideInLeft : "",
    animDir === "right" ? styles.lbSlideInRight : "",
  ]
    .filter(Boolean)
    .join(" ");
  const outClass = [
    styles.lbImg,
    styles.lbOut,
    animDir === "left" ? styles.lbSlideOutLeft : "",
    animDir === "right" ? styles.lbSlideOutRight : "",
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
            backgroundPosition: photo.position,
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
          <button
            className={styles.lbClose}
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          <div className={styles.lbCounter}>
            {lightboxIdx + 1} / {visiblePhotos.length}
          </div>

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

          <div
            className={styles.lbImgWrap}
            onClick={(e) => e.stopPropagation()}
          >
            {prevPhoto && (
              <img
                key={`out-${prevIdx}`}
                className={outClass}
                src={prevPhoto.photo.url}
                alt=""
                draggable={false}
              />
            )}
            <img
              key={`in-${lightboxIdx}`}
              className={inClass}
              src={currentPhoto.photo.url}
              alt={currentPhoto.label}
              draggable={false}
            />
          </div>

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

          <p className={styles.lbCaption}>{currentPhoto.label}</p>
        </div>
      )}
    </main>
  );
}
