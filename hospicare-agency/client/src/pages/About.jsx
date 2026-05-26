import styles from "../styles/About.module.css";

const teamMembers = [
  { name: "Amit Deshmukh", role: "Managing Director" },
  { name: "Neha Patil", role: "Operations Head" },
  { name: "Rahul Kulkarni", role: "Supply Chain Lead" },
  { name: "Priya Joshi", role: "Compliance Officer" },
];

const licences = [
  "Wholesale Drug Licence (Maharashtra FDA)",
  "CDSCO registered distributor",
  "GST registered",
  "ISO 9001:2015",
];

const About = () => {
  const initialsFromName = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("");

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1>Hospicare Agency</h1>
          <p>Founded in 2004 • Nashik, Maharashtra</p>
          <p className={styles.subtitle}>
            We are a wholesale medical agency supplying trusted brands across
            Maharashtra with a focus on quality, compliance, and dependable
            service.
          </p>
        </div>
      </section>

      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div>
              <h3>Founded</h3>
              <p>2004</p>
            </div>
            <div>
              <h3>Clients</h3>
              <p>800+</p>
            </div>
            <div>
              <h3>Products</h3>
              <p>2400+</p>
            </div>
            <div>
              <h3>Brand partners</h3>
              <p>50+</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <h2>Our mission</h2>
          <p>
            To make reliable healthcare supply chains accessible to every
            hospital, clinic, and pharmacy by delivering authentic products,
            transparent pricing, and expert support—every single day.
          </p>
        </div>
      </section>

      <section className={styles.team}>
        <div className="container">
          <h2>Leadership team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.avatar}>
                  {initialsFromName(member.name)}
                </div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.licences}>
        <div className="container">
          <h2>Licences & certifications</h2>
          <ul>
            {licences.map((item) => (
              <li key={item}>
                <span className={styles.check} aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
