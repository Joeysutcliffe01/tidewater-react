import { useSite } from "../../context/SiteContext";
import styles from "./EditorToggle.module.css";

export default function EditorToggle({ isEditing, onToggle }) {
  const { isAdmin, adminLogout } = useSite();

  if (!isAdmin) return null;

  return (
    <div className={styles.wrap}>
      <button
        className={`${styles.btn} ${isEditing ? styles.active : ""}`}
        onClick={onToggle}
      >
        {isEditing ? "✕ Close Editor" : "✏ Edit Site"}
      </button>
      {isEditing && (
        <button className={styles.logout} onClick={adminLogout}>
          Log Out
        </button>
      )}
    </div>
  );
}
