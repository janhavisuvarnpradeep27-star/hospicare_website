import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.column}>
          <h3>Hospicare Agency</h3>
          <p>
            Wholesale medical supply partner for hospitals, clinics, nursing
            homes, and pharmacies across Maharashtra. Trusted since 2004.
          </p>
        </div>
        <div className={styles.column}>
          <h4>Quick links</h4>
          <div className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About us</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className={styles.column}>
          <h4>Contact</h4>
          <p>14, Satpur MIDC, Nashik – 422 007</p>
          <p>+91 98230 45678</p>
          <p>orders@medlinepharma.in</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()} Hospicare Agency. All rights reserved.
        </span>
        <span className={styles.badge}>SSL Secured</span>
      </div>
    </footer>
  );
};

export default Footer;
