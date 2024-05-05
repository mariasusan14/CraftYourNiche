import "./Productcard.css";
import { products } from "../../assets/products";


export default function ProductCard({ product }) {
  const { title, url, price, rating } = product; 
  
  return (
    <div className="product-card">
      <div className="product-image--container">
        <img src={url} alt={title} className="product-image" /> 
      </div>
      <div className="product-dt">
        <span className="product-name">{title}</span>
        
        <span className="product-price">${price}</span>
        <div className="product-rating">
          {Array.from({ length: rating }, (_, index) => (
            <span key={index} className="star">&#9733;</span> 
          ))}
        </div>
      </div>
    </div>
  );
};
