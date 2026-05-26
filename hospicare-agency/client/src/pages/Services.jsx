import styles from "../styles/Services.module.css";

const services = [
  {
    title: "Bulk wholesale supply",
    description:
      "Reliable bulk supply of pharmaceuticals, surgical, diagnostics, and equipment for healthcare institutions.",
    tags: ["MOQ available", "Volume discounts", "Credit terms"],
  },
  {
    title: "Delivery & logistics",
    description:
      "Dedicated logistics network with temperature-controlled handling and same-day dispatch options.",
    tags: ["Same-day dispatch", "Cold chain", "Pan-Maharashtra"],
  },
  {
    title: "Custom procurement",
    description:
      "Sourcing support for rare, special, or urgent products with transparent timelines.",
    tags: ["Rare products", "Import support", "Custom orders"],
  },
  {
    title: "Documentation & compliance",
    description:
      "End-to-end documentation, batch tracking, and regulatory compliant invoicing.",
    tags: ["GST invoicing", "Batch tracking", "FDA compliant"],
  },
  {
    title: "Dedicated account management",
    description:
      "A single point of contact to manage enquiries, orders, and after-sales support.",
    tags: ["Single point of contact", "After-sales support"],
  },
];

const Services = () => {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1>Services</h1>
          <p>
            Tailored wholesale services designed for hospitals, clinics, and
            pharmacies across Maharashtra.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.title} className={styles.card}>
              <div className={styles.iconBox}>★</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className={styles.tags}>
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
