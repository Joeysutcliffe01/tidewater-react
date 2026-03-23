import { useState } from "react";
import { useSite } from "../context/SiteContext";
import styles from "./Gallery.module.css";

const defaultPhotos = [
  { id: 1, cat: "fishing", label: "Fly rod bent double" },
  { id: 2, cat: "fishing", label: "Striper at surface" },
  { id: 3, cat: "fishing", label: "Sunset lobster boat" },
  { id: 4, cat: "fishing", label: "Striper release" },
  { id: 5, cat: "landscape", label: "Rocky island shoreline" },
  { id: 6, cat: "landscape", label: "Island house in fog" },
  { id: 7, cat: "fishing", label: "Bay at low tide" },
  { id: 8, cat: "landscape", label: "Rocky shore walk" },
  { id: 9, cat: "wildlife", label: "Seal swimming" },
];

const filters = [
  { key: "all", label: "All" },
  { key: "fishing", label: "Fishing" },
  { key: "landscape", label: "Landscapes" },
  { key: "wildlife", label: "Wildlife" },
];

export default function Gallery() {
  const { settings } = useSite();
  const galleryHero = settings.images?.galleryHero ?? {
    url: "",
    position: "center",
    brightness: 0.55,
  };
  const [active, setActive] = useState("all");

  const heroBgStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: galleryHero.url ? `url('${galleryHero.url}')` : "none",
    backgroundSize: "cover",
    backgroundPosition: galleryHero.position,
    backgroundRepeat: "no-repeat",
    filter: `brightness(${galleryHero.brightness})`,
  };

  const filtered =
    active === "all"
      ? defaultPhotos
      : defaultPhotos.filter((p) => p.cat === active);

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

      {/* ── GALLERY ── */}
      <section className={styles.gallery}>
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.key}
              className={
                active === f.key
                  ? `${styles.filterBtn} ${styles.filterActive}`
                  : styles.filterBtn
              }
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((photo) => (
            <div key={photo.id} className={styles.gridItem}>
              <div className={styles.photoPh}>
                <span>{photo.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
