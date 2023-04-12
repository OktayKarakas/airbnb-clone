import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import SmallCard from "@/components/SmallCard";
import { useEffect, useState } from "react";
import MediumCard from "@/components/MediumCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import LargeCard from "@/components/LargeCard";

export default function Home({ exploreData, cardsData }) {
  const [exploreLoading, setExploreLoading] = useState(true);
  const [ExPloreError, setExploreError] = useState(false);
  const [mediumCompError, setMediumCompError] = useState(false);
  useEffect(() => {
    if (exploreData === null && cardsData === null) {
      setExploreError(true);
      setMediumCompError(true);
      setExploreLoading(false);
    } else if (exploreData === null) {
      setExploreError(true);
    } else if (cardsData === null) {
      setMediumCompError(true);
    }

    if (exploreData?.length > 0) {
      setExploreLoading(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Hello Airbnb!</title>
      </Head>
      <Header />
      <Banner />
      <main className="max-w-7xl mx-auto px-3.5 sm:px-16 md:px-8">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {!exploreLoading
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
          {ExPloreError && <h3>Error!</h3>}
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8 h-4/6">Live Anywhere</h2>
          <div className="p-3 -ml-3">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3.5,
                },
              }}
            >
              {cardsData?.map((card) => (
                <SwiperSlide
                  key={card.img}
                  style={{
                    height: "25rem",
                    width: "25rem",
                    paddingLeft: "0.7rem",
                  }}
                >
                  <div className="h-full overflow-visible">
                    <MediumCard img={card.img} title={card.title} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {mediumCompError && <p>Error!</p>}
        </section>
        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated By Airbnb"
          buttonText="Get Inspired"
        />
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const exploreDataRespond = await fetch("https://www.jsonkeeper.com/b/4G1G");
    const exploreData = await exploreDataRespond.json();
    const cardsDataRespond = await fetch("https://www.jsonkeeper.com/b/VHHT");
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
