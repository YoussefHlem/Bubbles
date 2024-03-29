import { useState } from "react";
import { client } from "@/lib/client";
import { Footer, Navbar, Product } from "@/components";
import { urlFor } from "@/lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
const ProductDetails = ({ navData, product, products }) => {
  const { image, name, details, price, size } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };
  return (
    <>
      <Navbar navLogo={navData[0]} />
      <div className="container">
        <div>
          <div className="product-detail-container">
            <div className="image-container">
              <img
                src={urlFor(image[index])}
                className="product-detail-image"
              />
            </div>
            <div className="product-detail-desc">
              <h1>{name}</h1>
              <div className="reviews">
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <p>(20)</p>
              </div>
              <h4>Details: </h4>
              <p>{details}</p>
              <p className="price">{price} L.E</p>
              <div className="quantity">
                <h3>Quantity:</h3>
                <p className="quantity-desc">
                  <span className="minus" onClick={decQty}>
                    <AiOutlineMinus />
                  </span>
                  <span className="num">{qty}</span>
                  <span className="plus" onClick={incQty}>
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="add-to-cart"
                  onClick={() => onAdd(product, qty)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="buy-now"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
                {products.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const navQuery = '*[_type == "navLogo"]';
  const navData = await client.fetch(navQuery);

  return {
    props: { products, navData, product },
  };
};

export default ProductDetails;
