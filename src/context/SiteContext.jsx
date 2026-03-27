import { createContext, useContext, useState, useEffect } from "react";

const defaultSettings = {
  navLayout: 1,
  footerLayout: 1,
  colors: {
    navy: "#1a2744",
    gold: "#c8a951",
  },
  images: {
    introHero: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774104111/Fish_On_kylifh.jpg",
      position: "center",
      brightness: 0.8,
    },
    fishingHero: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774104836/Sunrise_over_Whaleboat_Isl._on_the_Solstice_ssn28a.jpg",
      position: "center 75%",
      brightness: 0.8,
    },
    sightseeingHero: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774186237/Looking_out_to_Casco_Bay_1_w6bxca.jpg",
      position: "center",
      brightness: 0.75,
    },
    galleryHero: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774426355/Rocky_Coast_of_Maine_1_eqplha.jpg",
      position: "center 75%",
      brightness: 0.75,
    },
    contactHero: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774182787/35__Fish_6_8_23_sl6uqn.jpg",
      position: "center 70%",
      brightness: 0.8,
    },
    fishPhoto: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774181698/Husky_Striper_on_Green_Crab_Fly_f6ywde.png",
      position: "center",
      brightness: 1,
    },
    fishingPhoto1: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774183965/Fish_and_Yellow_Fly_rqjctw.jpg",
      position: "center",
      brightness: 1,
    },
    fishingPhoto2: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774184018/RPL_s_Fish_v9fa3c.jpg",
      position: "center",
      brightness: 1,
    },
    fishingPhoto3: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774185692/IMG_0244_r63ne4.jpg",
      position: "center",
      brightness: 1,
    },
    fishingFullPhoto: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774184660/Fish_On_South_Freeport_tvicd9.jpg",
      position: "center",
      brightness: 1,
    },
    guidePhoto: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774182787/35__Fish_6_8_23_sl6uqn.jpg",
      position: "center",
      brightness: 1,
    },
    boatPhoto: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774182806/IMG_3798_1_xqvnhe.jpg",
      position: "center",
      brightness: 1,
    },
    sightseeingPhoto1: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774186298/Rocky_Shoreline_qubuvz.jpg",
      position: "center",
      brightness: 1,
    },
    sightseeingPhoto2: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774186332/Osprey_Nest_rhwk1f.jpg",
      position: "center",
      brightness: 1,
    },
    sightseeingPhoto3: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774186349/Early_Fall_Great_time_to_Fish_pd2gfk.jpg",
      position: "center",
      brightness: 1,
    },
    bayPanorama: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774426424/Fog_Bank_in_the_Distance_1_lwgjwe.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto1: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774427992/Bent_Rod_with_fish_on_1_l60ezn.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto2: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774183965/Fish_and_Yellow_Fly_rqjctw.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto3: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774428066/IMG_1813_1_zu1yo0.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto4: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774428104/Go_Get_Bigger_1_saw6yx.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto5: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774427953/Rocky_Coast_of_Maine_1_gnslh0.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto6: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774428148/Pound_of_Tea_Island_1_badirl.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto7: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774428207/Crab_Island_Ledge_1_pxeb2n.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto8: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774428261/Frame-27-01-2026-03-54-38_1_hsgzdr.jpg",
      position: "center",
      brightness: 1,
    },
    galleryPhoto9: {
      url: "https://res.cloudinary.com/dfujw9ted/image/upload/v1774428307/Deer_Swimming_Between_Islands_5.03.50_PM_1_gcpyga.png",
      position: "center",
      brightness: 1,
    },
  },
  content: {
    heroQuote:
      '"Rock-bound coastline. Savage takes. Memories that last a lifetime."',
    heroTagline: "Casco Bay · South Freeport, Maine",
    aboutTitle:
      "Come to the rocky shores, islands, and inlets of Casco Bay, Maine in pursuit of the premier gamefish of the East Coast.",
    aboutBody:
      "A wild, burly fish that may have migrated from the Hudson, Delaware, and points south, stripers arrive when the lilacs bloom and depart as autumn leaves fall.",
    fishingTitle: "How a Trip Unfolds",
    fishingBody: "",
    sightTitle: "Discover Casco Bay",
    sightBody:
      "Not everyone fly fishes — and that's perfectly fine. Join us for a few hours on the water to experience the beauty of Casco Bay.",
    contactPhone: "207-522-7366",
    contactEmail: "flyrod@tidewaterflyoutfitters.com",
    rate1Price: "$500",
    rate1Duration: "4 Hours",
    rate2Price: "$300",
    rate2Duration: "3 Hours",
  },
};

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  // Clear localStorage on every load — temporary until MERN backend is ready
  try {
    localStorage.removeItem("tw_settings");
  } catch {}

  const [settings, setSettings] = useState(() => defaultSettings);

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem("tw_admin") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tw_settings", JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const updateSetting = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const updateContent = (key, value) =>
    setSettings((prev) => ({
      ...prev,
      content: { ...prev.content, [key]: value },
    }));

  const updateImage = (key, field, value) =>
    setSettings((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [key]: { ...prev.images[key], [field]: value },
      },
    }));

  const updateColor = (key, value) =>
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));

  const resetSettings = () => {
    setSettings(defaultSettings);
    try {
      localStorage.removeItem("tw_settings");
    } catch {}
  };

  const adminLogin = () => {
    setIsAdmin(true);
    try {
      sessionStorage.setItem("tw_admin", "1");
    } catch {}
  };

  const adminLogout = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem("tw_admin");
    } catch {}
  };

  return (
    <SiteContext.Provider
      value={{
        settings,
        isAdmin,
        updateSetting,
        updateContent,
        updateImage,
        updateColor,
        resetSettings,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within a SiteProvider");
  return ctx;
}
