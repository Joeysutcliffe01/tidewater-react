import { useSite } from "../context/SiteContext";
import styles from "./Intro.module.css";
import flyLine from "../assets/svg/TIDE-001 TIDEWATER LOGO Line only  (1).svg";
import fishMark from "../assets/svg/TIDE-001 TIDEWATER LOGO Reverse NO TYPE  (1).svg";

export default function Intro() {
  const { settings } = useSite();
  const { heroQuote, aboutBody } = settings.content;
  const { introHero, fishPhoto, guidePhoto, boatPhoto } = settings.images;

  return (
    <main className={styles.main}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div
          className={styles.heroBg}
          style={
            introHero.url
              ? {
                  backgroundImage: `url("${introHero.url}")`,
                  backgroundSize: "cover",
                  backgroundPosition: introHero.position,
                  filter: `brightness(${introHero.brightness})`,
                }
              : {}
          }
        />
        <div className={styles.heroContent}>
          {/* Fish mark — top right of the box, matching PDF */}
          <img
            src={fishMark}
            alt=""
            className={styles.heroFishMark}
            aria-hidden="true"
          />
          <div className={styles.heroBox}>
            <p className={styles.heroQuote}>{heroQuote}</p>
          </div>
        </div>
      </section>

      {/* ── LIGHT BAND ── */}
      <section className={styles.band}>
        <p className={styles.bandText}>
          It’s the oversized tail of the striped bass that gives the fish its
          rod-bending power.
        </p>
        <p className={styles.bandText}>
          Even a “schoolie” striper can turn a drifting boat 90 degrees: bigger
          fish will “pull” it outright.” A striper’s take – whether on the
          surface or
        </p>
        <p className={styles.bandText}>
          deep – is aggressive and unmistakable. There’s never a doubt when
          you’re tight with a striped bass.
        </p>
      </section>

      {/* ── FULL WIDTH FISH PHOTO ── */}
      <section className={styles.fishPhoto}>
        <div
          className={styles.fishPhotoPlaceholder}
          style={{
            backgroundImage: fishPhoto.url ? `url("${fishPhoto.url}")` : "none",
            backgroundSize: "cover",
            backgroundPosition: fishPhoto.position,
          }}
        >
          {!fishPhoto.url && <span>Full width striper photo</span>}
        </div>
      </section>

      {/* ── ABOUT TEXT ── */}
      <section className={styles.aboutText}>
        <p className={styles.aboutPara}>
          Come to the rocky shores, islands, and inlets of Casco Bay, Maine in
          pursuit of the premier gamefish of the East Coast.
        </p>
        <p className={styles.aboutPara}>
          A wild, burly fish that may have migrated from the Hudson, Delaware,
          and points south, stripers arrive when the lilacs bloom and depart as
        </p>
        <p className={styles.aboutPara}>
          autumn leaves fall. Catching one on a fly in the beauty of Casco Bay
          is a thrill that stays with you.
        </p>
      </section>

      {/* ── PHOTO PAIR ── */}
      <section className={styles.photoPair}>
        <div
          className={styles.photoPairPlaceholder}
          style={
            guidePhoto.url
              ? {
                  backgroundImage: `url("${guidePhoto.url}")`,
                  backgroundSize: "cover",
                  backgroundPosition: guidePhoto.position,
                }
              : {}
          }
        >
          {!guidePhoto.url && <span>Guide photo</span>}
        </div>
        <div
          className={styles.photoPairPlaceholder}
          style={
            boatPhoto.url
              ? {
                  backgroundImage: `url("${boatPhoto.url}")`,
                  backgroundSize: "cover",
                  backgroundPosition: boatPhoto.position,
                }
              : {}
          }
        >
          {!boatPhoto.url && <span>Boat photo</span>}
        </div>
      </section>

      {/* ── ABOUT NAVY BAND ── */}
      <section className={styles.aboutNavy}>
        <div className={styles.aboutNavyInner}>
          <div className={styles.aboutLabel}>About</div>
          <p className={styles.aboutNavyText}>
            Tidewater Fly Outfitters is a fly-fishing guide service based in
            South Freeport, Maine.
          </p>
          <p className={styles.aboutNavyText}>
            Your captain and guide, Registered Maine Guide Rod Lane, has spent
            more than 25 years targeting striped bass on the fly in Casco Bay.
          </p>
          <p className={styles.aboutNavyText}>
            His passion and local knowledge are what put clients on fish. You’ll
            fish from a 2024 Jones Brothers Cape Fisherman, a 20-foot platform
          </p>
          <p className={styles.aboutNavyText}>
            designed for fly-fishing and perfectly suited for both skinny water
            and the open bay.
          </p>
        </div>
        {/* Decorative fly line — bottom right, matches PDF */}
        <img
          src={flyLine}
          alt=""
          className={styles.flyLine}
          aria-hidden="true"
        />
      </section>
    </main>
  );
}
