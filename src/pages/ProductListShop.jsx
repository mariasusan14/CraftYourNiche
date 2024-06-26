import React from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { products } from "../assets/products";
import Slider from "react-slick"; // Import React Slick for carousel functionality
import "slick-carousel/slick/slick.css"; // Import slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import slick carousel theme styles

const ProductListShop = () => {
  // Sample new arrivals data
  const newArrivals = products.slice(0, 5); // Assuming first 5 products are new arrivals

  // Slick carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="product-list-shop">
      {/* New Arrivals */}
      <div className="product-list-section">
        <h2>New Arrivals</h2>
        <Slider {...carouselSettings}>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductListShop;
