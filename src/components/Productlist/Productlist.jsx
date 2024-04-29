import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { products } from "../../assets/products";

import "./Productlist.css";

const ProductList = ({ product }) => {
  const products = product;

  return (
    <div className="productlist">
      {/* Grid list of products */}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
