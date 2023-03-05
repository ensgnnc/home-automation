import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import SwitchComponent from "@/components/SwitchComponent";
import { getItemsInRoom, getRoomByID } from "lib/database_handler";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {

  const id = parseInt(context.query.id);

  try {
    const item = await getItemsInRoom(id);

    const room = await getRoomByID(id);

    return {
      props: {
        room: room,
        item: item,
      },
    };
  } catch (e) {
    console.log(e);
  }
}

const RenderItems = ({ items, condition }) => {
  return condition ? (
    items.map((item) => (
      <SwitchComponent
        key={item.id}
        currentState={item.state}
        itemID={item.name}
      ></SwitchComponent>
    ))
  ) : <h1>No Item</h1>
}

export default function Room({ room, item }) {
  return (
    <>
      <Head>
        <title>{room[0].name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: 24 }} className={inter.className}>
            {room[0].name}
          </h2>
          <div className={styles.grid}>
            <RenderItems items={item} condition={item.length != 0}></RenderItems>
          </div>
        </div>
      </main>
    </>
  );
}