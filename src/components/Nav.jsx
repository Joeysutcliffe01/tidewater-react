import { useSite } from "../context/SiteContext";
import NavLayout1 from "./nav/NavLayout1";
import NavLayout2 from "./nav/NavLayout2";

export default function Nav() {
  const { settings } = useSite();

  switch (settings.navLayout) {
    case 2:
      return <NavLayout2 />;
    case 1:
    default:
      return <NavLayout1 />;
  }
}
