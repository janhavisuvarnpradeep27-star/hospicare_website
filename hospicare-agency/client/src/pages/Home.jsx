import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import styles from "../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const categories = useMemo(
    () => [
      { label: "Pharmaceuticals", value: "Pharmaceuticals", icon: "💊" },
      { label: "Surgical items", value: "Surgical", icon: "🧤" },
      { label: "Diagnostics", value: "Diagnostics", icon: "🧪" },
      { label: "Wound care", value: "Wound care", icon: "🩹" },
      { label: "Injectables", value: "Injectables", icon: "💉" },
      { label: "Equipment", value: "Equipment", icon: "🩺" },
    ],
    []
  );

  const categoryCards = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        count: products.filter((item) => item.category === category.value)
          .length,
      })),
    [categories],
  );

  const features = [
    {
      title: "Fully licensed",
      description: "CDSCO & Maharashtra FDA certified wholesale distributor.",
    },
    {
      title: "Fast delivery",
      description: "Same-day dispatch for orders confirmed before 12 PM.",
    },
    {
      title: "Bulk pricing",
      description: "Competitive volume discounts for hospitals and clinics.",
    },
    {
      title: "Dedicated support",
      description: "Account manager assigned to every client.",
    },
  ];

  const brands = [
    "Cipla",
    "Sun Pharma",
    "Dr. Reddy's",
    "Abbott",
    "Johnson & Johnson",
    "3M Medical",
    "B. Braun",
    "Becton Dickinson",
    "Lupin",
    "Alkem",
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Your trusted partner for bulk medical supplies</h1>
            <p>
              Serving Maharashtra since 2004 with reliable, compliant, and
              on-time wholesale medical distribution.
            </p>
            <div className={styles.heroActions}>
              <button
                className={styles.primaryButton}
                onClick={() => navigate("/products")}
              >
                Browse catalogue
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => navigate("/contact")}
              >
                Request a quote
              </button>
            </div>
            <div className={styles.stats}>
              <div>
                <h3>2400+</h3>
                <p>Products</p>
              </div>
              <div>
                <h3>800+</h3>
                <p>Clients</p>
              </div>
              <div>
                <h3>20 Years</h3>
                <p>Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.categories}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Product categories</h2>
            <p>
              Browse key wholesale categories stocked for healthcare partners.
            </p>
          </div>
          <div className={styles.categoryGrid}>
              {categoryCards.map((category) => (
                <button
                  key={category.value}
                  className={styles.categoryCard}
                  onClick={() =>
                    navigate(
                      `/products?category=${encodeURIComponent(category.value)}`,
                    )
                  }
                >
                <span className={styles.categoryIcon} aria-hidden="true">
                  {category.icon}
                </span>
                <div>
                  <h4>{category.label}</h4>
                  <p>{category.count}+ products</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.whyUs}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why choose us</h2>
            <p>
              Reliability, compliance, and service excellence at every step.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.brands}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Brands we carry</h2>
            <p>Trusted names in pharmaceuticals and medical devices.</p>
          </div>
          <div className={styles.brandTags}>
            {brands.map((brand) => (
              <span key={brand} className={styles.brandTag}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
