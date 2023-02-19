import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import RoomComponent from "@/components/RoomComponent";
import { getRoom } from "lib/db_handler";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
  try {
    const room = JSON.parse(JSON.stringify(await getRoom()));

    return {
      props: {
        room: JSON.parse(JSON.stringify(room)),
      },
    };
  } catch (e) {
    return console.log(e);
  }
}

export default function Home({ room }) {
  return (
    <>
      <Head>
        <title>Home Automation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          {room.map((_room) => (
            <RoomComponent
              key={_room.id}
              roomName={_room.roomName}
              roomID={_room.id}
            ></RoomComponent>
          ))}
        </div>
      </main>
    </>
  );
}
