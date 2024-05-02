import {React, useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product A', price: 20, image: 'productA.jpg' },
    { id: 2, name: 'Product B', price: 30, image: 'productB.jpg' },
    { id: 3, name: 'Product C', price: 25, image: 'productC.jpg' },
  ]);

  const shippingCharge = 5; // Example shipping charge

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0) + shippingCharge;

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td><img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{item.name}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Shipping Charge: ${shippingCharge}</p>
        <p>Total: ${totalPrice}</p>
      </div>
    </div>
  );
}

export default ShoppingCart;
