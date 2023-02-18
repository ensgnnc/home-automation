import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

function SwitchComponent({ currentState, itemID }) {
  return (
    <div className={styles.ItemCard}>
      <h2 className={inter.className}>{itemID}</h2>
      <label className={styles.switch}>
        <input
          type={"checkbox"}
          defaultChecked={currentState}
          onClick={() => {}}
        ></input>
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
export default SwitchComponent;
