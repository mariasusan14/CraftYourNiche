import React from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { products } from "../assets/products";
import Slider from "react-slick"; // Import React Slick for carousel functionality
import "slick-carousel/slick/slick.css"; // Import slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import slick carousel theme styles

const BestSellersCarousel = () => {
  // Sample bestsellers data
  const bestsellers = products.slice(5, 10); // Assuming next 5 products are bestsellers

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
    <div className="product-list-section">
      <h2>Bestsellers</h2>
      <Slider {...carouselSettings}>
        {bestsellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  );
};

export default BestSellersCarousel;
