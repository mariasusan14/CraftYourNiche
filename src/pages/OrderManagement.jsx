import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, productName: 'Product A', amount: 50, status: 'Ready', image: 'productA.jpg' },
    { id: 2, productName: 'Product B', amount: 30, status: 'Shipped', image: 'productB.jpg' },
    { id: 3, productName: 'Product C', amount: 20, status: 'Delivered', image: 'productC.jpg' },
    { id: 4, productName: 'Product D', amount: 40, status: 'Cancelled', image: 'productD.jpg' },
  ]);

  return (
    <div>
      <h2>Order Management</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td><img src={order.image} alt={order.productName} style={{ width: '50px', height: '50px' }} /></td>
              <td>{order.productName}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
