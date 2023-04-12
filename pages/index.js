import { client } from "../lib/client";
import { HomePage, Footer, HeroBanner, Navbar } from "../components";
import { urlFor } from "../lib/client";
const Home = ({ products, bannerData, navData }) => {
  return (
    <>
      <Navbar navLogo={navData[0]} />
      <HeroBanner />
      <HomePage />
      <Footer />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const navQuery = '*[_type == "navLogo"]';
  const navData = await client.fetch(navQuery);

  return {
    props: { products, bannerData, navData },
  };
};

export default Home;
