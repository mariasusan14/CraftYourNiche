import "./Productcard.css"

export default function ProductCard({ product }){
    const { name, image, price, rating } = product;
  
    return (
      <div className="product-card">
        <div className="product-image--container">
        <img src={image} alt={name} className="product-image" />
        </div>
        <div className="product-dt">
          <span className="product-name">{name}</span>
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