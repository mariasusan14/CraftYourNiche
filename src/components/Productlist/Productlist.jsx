import "./Productcard.css"
import "./Productlist.css"


export default function Productlist(){
    const products = [
        {
          id: 1,
          name: 'Product 1',
          image: 'product1.jpg',
          price: 20.99,
          rating: 4,
        },
        {
          id: 2,
          name: 'Product 2',
          image: 'product2.jpg',
          price: 25.49,
          rating: 5,
        },
        // Add more products as needed
      ];
    return (
        <div className='productlist'>
            {products.map(product => (
        <ProductCard product={product}/>
            ))} 
        </div>
        
    )
}


const ProductCard = ({ product }) => {
  const { name, image, price, rating } = product;

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>
        <div className="product-rating">
          {Array.from({ length: rating }, (_, index) => (
            <span key={index} className="star">&#9733;</span>
          ))}
        </div>
      </div>
    </div>
  );
};


