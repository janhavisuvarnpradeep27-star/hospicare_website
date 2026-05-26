import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.navbar}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">
            ✚
          </span>
          <span className={styles.brandText}>HOSPICARE AGENCY</span>
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <Link className={isActive("/") ? styles.active : ""} to="/">
            Home
          </Link>
          <Link
            className={isActive("/products") ? styles.active : ""}
            to="/products"
          >
            Products
          </Link>
          <Link className={isActive("/about") ? styles.active : ""} to="/about">
            About us
          </Link>
          <Link
            className={isActive("/services") ? styles.active : ""}
            to="/services"
          >
            Services
          </Link>
          <Link
            className={isActive("/contact") ? styles.active : ""}
            to="/contact"
          >
            Contact
          </Link>
          <Link className={styles.ctaButton} to="/contact">
            Enquire now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
