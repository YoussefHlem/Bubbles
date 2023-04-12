import { client } from "@/lib/client";
import { Layout, Footer, HeroBanner, Navbar, Product } from "../../components";
import { urlFor } from "@/lib/client";
const Categories = ({ products, navData }) => {
  return (
    <>
      <Navbar navLogo={navData[0]} />
      <div className="products-page">
        <div className="container">
          <div className="products-container">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const navQuery = '*[_type == "navLogo"]';
  const navData = await client.fetch(navQuery);

  return {
    props: { products, navData },
  };
};
export default Categories;
