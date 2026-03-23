import { useState } from "react";
import { useSite } from "../../context/SiteContext";
import styles from "./AdminLogin.module.css";

// SHA-256 hash of 'tidewater2025'
const ADMIN_USER = "admin";
const ADMIN_HASH =
  "ca8fb56a1bf91c9a41716a3687105f3e8ea5fa3a6f4f7f2e5f215b7fe97becc4";

async function hashPassword(str) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function AdminLogin({ onClose }) {
  const { adminLogin } = useSite();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const hash = await hashPassword(password);
    if (username === ADMIN_USER && hash === ADMIN_HASH) {
      adminLogin();
      onClose();
    } else {
      setError(true);
      setPassword("");
    }
    setLoading(false);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div className={styles.field}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="new-password"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {error && (
            <p className={styles.error}>Incorrect username or password.</p>
          )}

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Checking…" : "Log In"}
          </button>
        </form>

        <button className={styles.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
