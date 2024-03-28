import React, { useState } from 'react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Product A', price: 20, availability: 'In stock', image: 'productA.jpg' },
    { id: 2, name: 'Product B', price: 30, availability: 'Out of stock', image: 'productB.jpg' },
    { id: 3, name: 'Product C', price: 25, availability: 'In stock', image: 'productC.jpg' },
  ]);

  return (
    <div>
      <h2>Wishlist</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map(item => (
            <tr key={item.id}>
              <td><img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Wishlist;
