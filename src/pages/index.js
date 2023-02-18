import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import RoomComponent from "@/components/RoomComponent";
import clientPromise from "lib/mongodb";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;

    const db = client.db("home-automation");

    const room = await db.collection("rooms").find({}).toArray();

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
              roomName={_room.roomName}
              roomID={_room.id}
            ></RoomComponent>
          ))}
        </div>
      </main>
    </>
  );
}