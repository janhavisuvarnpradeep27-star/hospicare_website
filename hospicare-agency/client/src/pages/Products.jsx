import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import products from "../data/products";
import styles from "../styles/Products.module.css";

const categories = [
  "All",
  "Pharmaceuticals",
  "Surgical items",
  "Diagnostics",
  "Wound care",
  "Injectables",
  "Equipment",
];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1>Product catalogue</h1>
          <p>
            Browse our curated wholesale inventory. Use filters to find what you
            need quickly.
          </p>
        </div>

        <div className={styles.filters}>
          <input
            className={styles.search}
            type="search"
            placeholder="Search by product or brand"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className={styles.pills}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.pill} ${
                  selectedCategory === category ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <img src={product.imageUrl} alt={product.name} />
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <h3>{product.name}</h3>
                  <span className={styles.stockBadge}>
                    {product.inStock ? "In stock" : "Out of stock"}
                  </span>
                </div>
                <p className={styles.brand}>{product.brand}</p>
                <button
                  className={styles.enquireButton}
                  onClick={() =>
                    navigate(
                      `/contact?product=${encodeURIComponent(product.name)}`,
                    )
                  }
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.notice}>
          Contact us for the full catalogue and bulk pricing.
        </div>
      </div>
    </div>
  );
};

export default Products;
