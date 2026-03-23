import { useSite } from "../context/SiteContext";
import FooterLayout1 from "./footer/FooterLayout1";
import FooterLayout2 from "./footer/FooterLayout2";

export default function Footer() {
  const { settings } = useSite();

  switch (settings.footerLayout) {
    case 2:
      return <FooterLayout2 />;
    case 1:
    default:
      return <FooterLayout1 />;
  }
}
