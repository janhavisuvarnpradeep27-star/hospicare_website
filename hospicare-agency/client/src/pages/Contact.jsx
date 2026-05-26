import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import styles from "../styles/Contact.module.css";

const enquiryOptions = [
  "Product enquiry",
  "Bulk order quote",
  "New account setup",
  "General question",
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productParam = useMemo(
    () => searchParams.get("product") || "",
    [searchParams],
  );

  const [form, setForm] = useState({
    fullName: "",
    organisation: "",
    phone: "",
    email: "",
    enquiryType: enquiryOptions[0],
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productParam) {
      setForm((prev) => ({
        ...prev,
        message: `Hello, I would like to enquire about ${productParam}.`,
      }));
    }
  }, [productParam]);

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.organisation.trim())
      nextErrors.organisation = "Organisation name is required.";

    const phoneRegex = /^(?:\+91[-\s]?|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone.trim()))
      nextErrors.phone = "Enter a valid Indian phone number.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim()))
      nextErrors.email = "Enter a valid email address.";

    if (!form.message.trim() || form.message.trim().length < 20)
      nextErrors.message = "Message must be at least 20 characters.";

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setSubmitError("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: form.fullName.trim(),
        organisation: form.organisation.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        enquiryType: form.enquiryType,
        message: form.message.trim(),
        status: "New",
      };

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

      await Promise.all([
        addDoc(collection(db, "enquiries"), {
          ...payload,
          createdAt: serverTimestamp(),
        }),
        fetch(`${apiBaseUrl}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Email notification failed.");
          }
        }),
      ]);

      setStatusMessage(
        "Thanks for reaching out. We will contact you shortly with a quote.",
      );
      setForm({
        fullName: "",
        organisation: "",
        phone: "",
        email: "",
        enquiryType: enquiryOptions[0],
        message: "",
      });
      setErrors({});
    } catch (error) {
      setSubmitError(
        "Something went wrong while submitting your enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1>Contact us</h1>
          <p>Reach out for bulk pricing, quotations, or new account setup.</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <h3>Address</h3>
              <p>14, Satpur MIDC, Nashik – 422 007</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Phone</h3>
              <p>+91 98230 45678</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Email</h3>
              <p>janhavik275@gmail.com</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Business hours</h3>
              <p>Mon–Sat 9 AM–6 PM</p>
            </div>
            <a
              className={styles.whatsappLink}
              href="https://wa.me/917972661390"
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
            <div className={styles.mapPlaceholder}>Google Maps placeholder</div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label htmlFor="fullName">Full name *</label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <span>{errors.fullName}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="organisation">Organisation name *</label>
              <input
                id="organisation"
                name="organisation"
                value={form.organisation}
                onChange={handleChange}
              />
              {errors.organisation && <span>{errors.organisation}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone">Phone number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <span>{errors.phone}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email address *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span>{errors.email}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="enquiryType">Enquiry type</label>
              <select
                id="enquiryType"
                name="enquiryType"
                value={form.enquiryType}
                onChange={handleChange}
              >
                {enquiryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <span>{errors.message}</span>}
            </div>

            <button className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit enquiry"}
            </button>
            {statusMessage && <p className={styles.success}>{statusMessage}</p>}
            {submitError && <p className={styles.error}>{submitError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
