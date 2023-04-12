import React from "react";
import Link from "next/link";
import { urlFor } from "@/lib/client";

const Product = ({
  product: { image, name, arabicName, size, slug, price },
}) => {
  return (
    <div>
      <Link href={`/categories/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <div className="product-name">
            {name} - {size}
          </div>
          <div className="product-price">{price}L.E</div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
