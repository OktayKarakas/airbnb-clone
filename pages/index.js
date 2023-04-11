import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import SmallCard from "@/components/SmallCard";
import { useEffect, useState } from "react";

export default function Home({ exploreData, cardsData }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (exploreData === null) {
      setError(true);
      setLoading(false);
    }
    if (exploreData?.length > 0) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Hello Airbnb!</title>
      </Head>
      <Header />
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {!loading
              ? exploreData?.map((item) => {
                  return (
                    <SmallCard
                      key={item.img}
                      img={item.img}
                      distance={item.distance}
                      location={item.location}
                    />
                  );
                })
              : "Loading.."}
          </div>
          {error && <h3>Error!</h3>}
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const exploreDataRespond = await fetch("https://www.jsonkeeper.com/b/4G1G");
    const exploreData = await exploreDataRespond.json();
    const cardsDataRespond = await fetch("https://jsonkeeper.com/b/VHHT");
    const cardsData = await cardsDataRespond.json();
    return {
      props: {
        exploreData,
        cardsData,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        exploreData: null,
        cardsData: null,
      },
    };
  }
}
