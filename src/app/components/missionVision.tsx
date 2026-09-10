import Image from "next/image";
import { FiTarget, FiEye, FiShield, FiHeart, FiGlobe, FiSun, FiUsers, FiAward } from "react-icons/fi";
import styles from "./missionVision.module.css";

const missionValues = [
  { icon: FiSun, label: "Natural ingredients" },
  { icon: FiShield, label: "Pure coconut oil" },
  { icon: FiAward, label: "Traditional recipes" },
  { icon: FiHeart, label: "Made with care" },
];
const visionValues = [
  { icon: FiAward, title: "Authentic always", description: "Keeping Kerala’s snack heritage alive." },
  { icon: FiUsers, title: "Bringing us closer", description: "Familiar flavours for moments shared." },
  { icon: FiGlobe, title: "Beyond borders", description: "A little taste of home, around the world." },
  { icon: FiHeart, title: "Trust in every bite", description: "Quality at the heart of everything we do." },
];

export default function MissionVision() {
  return (
    <section className={styles.section} aria-label="Our mission and vision">
      <div className={styles.mission}>
        <div className={styles.copy}>
          <div className={styles.headingRow}>
            <div className={styles.iconBadge}><FiTarget aria-hidden="true" /></div>
            <h2 className={styles.heading}><em>Our</em>Mission</h2>
          </div>
          <div className={styles.flourish} aria-hidden="true" />
          <p className={styles.description}>
            To preserve and share authentic Kerala snack heritage by crafting 100% natural delicacies prepared exclusively in pure cold-pressed coconut oil, honoring traditional Kozhikode recipes with uncompromised quality.
          </p>
          <ul className={styles.missionValues}>
            {missionValues.map(({ icon: Icon, label }) => (
              <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>
            ))}
          </ul>
        </div>
        <div className={styles.foodStage}>
          <div className={styles.foodHalo} aria-hidden="true" />
          <div className={`${styles.bowl} ${styles.peanuts}`}>
            <Image src="/masala-peanuts-bowl.png" alt="Spiced masala peanuts in a wooden bowl" fill sizes="(max-width: 700px) 26vw, 190px" />
          </div>
          <div className={`${styles.bowl} ${styles.chips}`}>
            <Image src="/kuzhalappam-bowl.png" alt="Traditional kuzhalappam in a wooden bowl" fill sizes="(max-width: 700px) 64vw, 390px" />
          </div>
          <div className={`${styles.bowl} ${styles.achappam}`}>
            <Image src="/tapioca-sticks-bowl.png" alt="Crispy tapioca sticks in a wooden bowl" fill sizes="(max-width: 700px) 30vw, 210px" />
          </div>
          <span className={styles.foodCaption}>Kerala roots. Heartfelt flavours.</span>
        </div>
      </div>

      <div className={styles.vision}>
        <svg className={styles.topWave} viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28C360 100 850 -35 1440 24V70H0Z" fill="currentColor" /></svg>
        <div className={styles.visionInner}>
          <div className={styles.visionCopy}>
            <div className={styles.headingRow}>
              <div className={styles.iconBadge}><FiEye aria-hidden="true" /></div>
              <h2 className={styles.heading}><em>Our</em>Vision</h2>
            </div>
            <div className={styles.flourish} aria-hidden="true" />
            <p className={styles.description}>
              To be the most trusted global brand for authentic South Indian traditional snacks, bringing the crisp goodness, rich flavor, and nostalgic warmth of village kitchens to households across the world.
            </p>
          </div>
          <ul className={styles.visionValues}>
            {visionValues.map(({ icon: Icon, title, description }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
        <svg className={styles.bottomWave} viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V20C1100 110 420 -10 0 55Z" fill="currentColor" /></svg>
      </div>
    </section>
  );
}
