import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

function RoomComponent({ roomName, roomID }) {
  return (
    <Link
      href={"/room?id=" + roomID}
      className={styles.card}
      rel="noopener noreferrer"
    >
      <h2 className={styles.cardText}>{roomName}</h2>
    </Link>
  );
}
export default RoomComponent;
