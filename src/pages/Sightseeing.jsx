import { useSite } from "../context/SiteContext";
import styles from "./Sightseeing.module.css";

export default function Sightseeing() {
  const { settings } = useSite();
  const { sightTitle, sightBody } = settings.content;
  const {
    sightseeingHero,
    sightseeingPhoto1,
    sightseeingPhoto2,
    sightseeingPhoto3,
  } = settings.images;

  const heroBgStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: sightseeingHero.url
      ? `url('${sightseeingHero.url}')`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: sightseeingHero.position,
    backgroundRepeat: "no-repeat",
    filter: `brightness(${sightseeingHero.brightness})`,
  };

  const photoStyle = (photo) => ({
    backgroundImage: photo.url ? `url('${photo.url}')` : "none",
    backgroundSize: "cover",
    backgroundPosition: photo.position,
  });

  return (
    <main className={styles.main}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={heroBgStyle} />
        <div className={styles.heroContent}>
          <div className={styles.heroBox}>
            <p className={styles.heroTitle}>Sightseeing</p>
          </div>
        </div>
      </section>

      {/* ── LIGHT BAND ── */}
      <section className={styles.band}>
        <p className={styles.bandText}>
          Not everyone fly fishes — and that's perfectly fine. Join us for a few
          hours on the water to experience the beauty of Casco Bay. Bring your
          camera or sketch pad.
        </p>
        <p className={styles.bandText}>
          You may see ospreys, bald eagles, seals, great blue herons, and
          countless shorebirds. The rugged shoreline and protective islands —
          some inhabited, some wild and rock-bound — are rich with history and
          character. Let Captain Lane be your local guide.
        </p>
      </section>

      {/* ── 3 PHOTO GRID ── */}
      <section className={styles.photoGrid}>
        <div className={styles.photoPh} style={photoStyle(sightseeingPhoto1)}>
          {!sightseeingPhoto1.url && <span>Rocky shoreline</span>}
        </div>
        <div className={styles.photoPh} style={photoStyle(sightseeingPhoto2)}>
          {!sightseeingPhoto2.url && <span>Osprey nest</span>}
        </div>
        <div className={styles.photoPh} style={photoStyle(sightseeingPhoto3)}>
          {!sightseeingPhoto3.url && <span>Fall foliage island</span>}
        </div>
      </section>

      {/* ── FULL WIDTH PANORAMA ── */}
      <section className={styles.fullPhoto}>
        <div className={styles.fullPhotoPh}>
          <span>Bay panorama — full width</span>
        </div>
      </section>
    </main>
  );
}
