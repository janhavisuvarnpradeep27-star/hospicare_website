import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import styles from "../styles/Admin.module.css";

const statusOptions = ["New", "In progress", "Resolved"];

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [enquiries, setEnquiries] = useState([]);
  const [loadError, setLoadError] = useState("");

  const isLoginRoute = useMemo(
    () => location.pathname === "/admin/login",
    [location.pathname],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loadingAuth) return;
    if (!user && !isLoginRoute) {
      navigate("/admin/login", { replace: true });
    }
    if (user && isLoginRoute) {
      navigate("/admin", { replace: true });
    }
  }, [loadingAuth, user, isLoginRoute, navigate]);

  useEffect(() => {
    if (!user) return;

    const enquiryQuery = query(
      collection(db, "enquiries"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      enquiryQuery,
      (snapshot) => {
        const rows = snapshot.docs.map((docRef) => ({
          id: docRef.id,
          ...docRef.data(),
        }));
        setEnquiries(rows);
        setLoadError("");
      },
      () => setLoadError("Unable to load enquiries right now."),
    );

    return () => unsubscribe();
  }, [user]);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password,
      );
    } catch (error) {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateDoc(doc(db, "enquiries", id), { status });
    } catch (error) {
      setLoadError("Unable to update status. Please retry.");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate?.() ?? new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loadingAuth) {
    return <div className={styles.loading}>Checking access...</div>;
  }

  if (!user && isLoginRoute) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <h1>Admin login</h1>
          <p>Sign in to review enquiry submissions.</p>
          <form onSubmit={handleLogin}>
            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit">Login</button>
            {loginError && <p className={styles.error}>{loginError}</p>}
          </form>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1>Enquiries</h1>
            <p>Latest submissions from hospitals, clinics, and pharmacies.</p>
          </div>
          <button className={styles.logout} onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>

        {loadError && <p className={styles.error}>{loadError}</p>}

        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Organisation</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Enquiry type</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((row) => (
                <tr key={row.id}>
                  <td>{formatDate(row.createdAt)}</td>
                  <td>{row.fullName}</td>
                  <td>{row.organisation}</td>
                  <td>{row.phone}</td>
                  <td>{row.email}</td>
                  <td>{row.enquiryType}</td>
                  <td className={styles.messageCell}>{row.message}</td>
                  <td>
                    <select
                      value={row.status || "New"}
                      onChange={(event) =>
                        handleStatusChange(row.id, event.target.value)
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
