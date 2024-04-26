// src/components/product list/ProductList.js

import React from "react";
import ProductCard from "../components/ProductCard/ProductCard"; // Import ProductCard component
import { products } from "../assets/products"; // Import sample product data

const ProductList = () => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
