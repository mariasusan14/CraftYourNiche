import React, { useState } from 'react';
import Navbar from './navbar';
import './styles/OrderManagement.css'; // Import CSS file for styling

const OrderManagement = () => {
  // Dummy data for orders
  const [orders, setOrders] = useState([
    { id: 1, invoiceNo: 'INV001', orderTime: '2024-03-10 10:00 AM', customerName: 'John Doe', method: 'Credit Card', amount: 100, status: 'Pending' },
    { id: 2, invoiceNo: 'INV002', orderTime: '2024-03-11 11:00 AM', customerName: 'Jane Smith', method: 'PayPal', amount: 150, status: 'Delivered' },
    { id: 3, invoiceNo: 'INV003', orderTime: '2024-03-12 12:00 PM', customerName: 'Alice Johnson', method: 'Cash on Delivery', amount: 200, status: 'Processing' },
    { id: 4, invoiceNo: 'INV004', orderTime: '2024-03-13 01:00 PM', customerName: 'Bob Brown', method: 'Credit Card', amount: 120, status: 'Pending' },
    { id: 5, invoiceNo: 'INV005', orderTime: '2024-03-14 02:00 PM', customerName: 'Emily Davis', method: 'PayPal', amount: 180, status: 'Delivered' },
    { id: 6, invoiceNo: 'INV006', orderTime: '2024-03-15 03:00 PM', customerName: 'David Wilson', method: 'Cash on Delivery', amount: 220, status: 'Processing' },
    { id: 7, invoiceNo: 'INV007', orderTime: '2024-03-16 04:00 PM', customerName: 'Sarah Martinez', method: 'Credit Card', amount: 130, status: 'Pending' },
    { id: 8, invoiceNo: 'INV008', orderTime: '2024-03-17 05:00 PM', customerName: 'Michael Anderson', method: 'PayPal', amount: 190, status: 'Delivered' },
    { id: 9, invoiceNo: 'INV009', orderTime: '2024-03-18 06:00 PM', customerName: 'Olivia Taylor', method: 'Cash on Delivery', amount: 240, status: 'Processing' },
    { id: 10, invoiceNo: 'INV010', orderTime: '2024-03-19 07:00 PM', customerName: 'James White', method: 'Credit Card', amount: 140, status: 'Pending' },
  ]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Number of orders per page

  // Filtering options
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filtered orders based on search query and status filter
  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (statusFilter === '' || order.status === statusFilter)
  );

  // Pagination calculations
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle activity change
  const handleActivityChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <section className="order-management">
      <Navbar />
      <div className="order-management-body">
        {/* Heading */}
        <br />
        <br />
        <div className="heading">Orders</div>
        <hr />
        <br />
        {/* Search and Filter */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Filter by status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders */}
        <div className="orders">
          <table>
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Order Time</th>
                <th>Customer Name</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Activity</th>
                <th>Invoice Bill</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.invoiceNo}</td>
                  <td>{order.orderTime}</td>
                  <td>{order.customerName}</td>
                  <td>{order.method}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                  <td>
                    <select onChange={(e) => handleActivityChange(order.id, e.target.value)}>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td><button >View Invoice</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <ul>
            {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }).map((_, index) => (
              <li key={index + 1} className={currentPage === index + 1 ? 'active' : ''}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OrderManagement;
