import { useSite } from "../context/SiteContext";
import styles from "./Fishing.module.css";
import flyLine from "../assets/svg/TIDE-001 TIDEWATER LOGO Line only  (1).svg";

export default function Fishing() {
  const { settings } = useSite();
  const { fishingTitle, fishingBody } = settings.content;
  const fallback = { url: "", position: "center", brightness: 1 };
  const fishingHero = settings.images?.fishingHero ?? {
    url: "",
    position: "bottom",
    brightness: 0.55,
  };
  const fishingPhoto1 = settings.images?.fishingPhoto1 ?? fallback;
  const fishingPhoto2 = settings.images?.fishingPhoto2 ?? fallback;
  const fishingPhoto3 = settings.images?.fishingPhoto3 ?? fallback;
  const fishingFullPhoto = settings.images?.fishingFullPhoto ?? fallback;

  const heroBgStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: fishingHero.url
      ? `url('${fishingHero.url}')`
      : `url('https://res.cloudinary.com/dfujw9ted/image/upload/v1774104836/Sunrise_over_Whaleboat_Isl._on_the_Solstice_ssn28a.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: fishingHero.position,
    backgroundRepeat: "no-repeat",
    filter: `brightness(${fishingHero.brightness})`,
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
        {/* Decorative fly line — matches PDF */}
        <img
          src={flyLine}
          alt=""
          className={styles.flyLine}
          aria-hidden="true"
        />
        <div className={styles.heroContent}>
          <div className={styles.heroBox}>
            <p className={styles.heroTitle}>Fishing</p>
          </div>
        </div>
      </section>

      {/* ── LIGHT BAND ── */}
      <section className={styles.band}>
        <p className={styles.bandText}>
          We depart at early dawn from Strouts Point Wharf Company. Depending on
          that day’s tide, we may begin fishing in
        </p>
        <p className={styles.bandText}>
          South Freeport Harbor….then move to proven spots around the bay
        </p>
      </section>

      {/* ── 3 PHOTO GRID ── */}
      <section className={styles.photoGrid}>
        <div className={styles.photoPh} style={photoStyle(fishingPhoto1)}>
          {!fishingPhoto1.url && <span>Fish being released</span>}
        </div>
        <div className={styles.photoPh} style={photoStyle(fishingPhoto2)}>
          {!fishingPhoto2.url && <span>Guide with fish</span>}
        </div>
        <div className={styles.photoPh} style={photoStyle(fishingPhoto3)}>
          {!fishingPhoto3.url && <span>Fly tying desk</span>}
        </div>
      </section>

      {/* ── BODY TEXT ── */}
      <section className={styles.body}>
        <p className={styles.bodyText}>
          We fish locally made Maine Fly Company rods (8–10 weight) paired with
          Orvis reels, rigged with fresh leaders and a variety of lines.
        </p>
        <p className={styles.bodyText}>
          Flies are locally tied. You’re welcome to bring your own saltwater fly
          gear.
        </p>
        <p className={styles.bodyText}>
          We are strictly catch-and-release, pinch our barbs, and keep fish wet
          whenever possible to minimize impact.
        </p>
        <p className={styles.bodyText}>
          The boat accommodates up to three anglers – fishing from the bow,
          stern and one waiting on deck. We welcome all experience levels.
        </p>
        <p className={styles.bodyText}>
          While the focus is on catching fish, every trip is low-pressure and
          fun.
        </p>
      </section>

      {/* ── FULL WIDTH ANGLER PHOTO ── */}
      <section className={styles.fullPhoto}>
        <div
          className={styles.fullPhotoPh}
          style={{
            backgroundImage: fishingFullPhoto.url
              ? `url('${fishingFullPhoto.url}')`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: fishingFullPhoto.position,
          }}
        >
          {!fishingFullPhoto.url && (
            <span>Angler fighting fish — full width</span>
          )}
        </div>
      </section>
    </main>
  );
}
