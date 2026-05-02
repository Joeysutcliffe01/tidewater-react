import { useSite } from "../context/SiteContext";
import styles from "./Sightseeing.module.css";

export default function Sightseeing() {
  const { settings } = useSite();
  const { sightTitle, sightBody } = settings.content;

  const sightseeingHero = settings.images?.sightseeingHero ?? {
    url: "",
    position: "center",
    brightness: 0.55,
  };
  const sightseeingPhoto1 = settings.images?.sightseeingPhoto1 ?? {
    url: "",
    position: "center",
    brightness: 1,
  };
  const sightseeingPhoto2 = settings.images?.sightseeingPhoto2 ?? {
    url: "",
    position: "center",
    brightness: 1,
  };
  const sightseeingPhoto3 = settings.images?.sightseeingPhoto3 ?? {
    url: "",
    position: "center",
    brightness: 1,
  };
  const bayPanorama = settings.images?.bayPanorama ?? {
    url: "",
    position: "center",
    brightness: 1,
  };

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

      {/* ── LIGHT BAND — DESKTOP ── */}
      <section className={`${styles.band} desktopOnly`}>
        <p className={styles.bandText}>
          Not everyone fly fishes — and that's perfectly fine. Join us for a few hours on the water to experience the beauty
          <br /><br />
          of Casco Bay. Bring your camera or sketch pad. You may see ospreys, bald eagles, seals, great blue herons,
          <br /><br />
          and countless shorebirds. The rugged shoreline and protective islands — some inhabited, some wild and rock-bound —
          <br /><br />
          are rich with history and character. Let Captain Lane be your local guide.
        </p>
      </section>

      {/* ── LIGHT BAND — MOBILE ── */}
      <section className={`${styles.band} mobileOnly`}>
        <p className={styles.bandText}>
          Not everyone fly fishes — and that's perfectly fine. Join us for a few hours on the water to experience the beauty of Casco Bay. <br /><br />Bring your camera or sketch pad. You may see ospreys, bald eagles, seals, great blue herons, and countless shorebirds. <br /><br />The rugged shoreline and protective islands — some inhabited, some wild and rock-bound — are rich with history and character. Let Captain Lane be your local guide.
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
        <div
          className={styles.fullPhotoPh}
          style={{
            backgroundImage: bayPanorama.url
              ? `url('${bayPanorama.url}')`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: bayPanorama.position,
          }}
        >
          {!bayPanorama.url && <span>Bay panorama — full width</span>}
        </div>
      </section>
    </main>
  );
}
