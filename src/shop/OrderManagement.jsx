import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import Navbar from './navbar'; 
import './styles/OrderManagement.css'; // Import CSS file for styling

const OrderManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; 
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const orders=[]

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = auth.currentUser.uid;
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('products', 'array-contains', { product: { shopId: userId } }));
        const querySnapshot = await getDocs(q);

        const allProducts = [];
        querySnapshot.forEach(doc => {
          const orderData = doc.data();
          const orderProducts = orderData.products || [];
          orderProducts.forEach(productData => {
            const product = productData.product;
            if (product.shopId === userId) {
              allProducts.push(product);
            }
          });
        });

        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  console.log(products);
  
  

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

  // Function to handle viewing invoice
  const viewInvoice = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setSelectedOrder(order);
  };

  // Function to close the invoice modal
  const closeInvoiceModal = () => {
    setSelectedOrder(null);
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
                    <option value="">Select</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => viewInvoice(order.id)}>View Invoice</button>
                  </td>
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
      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="invoice-modal">
          <div className="invoice-content">
            <span className="close" onClick={closeInvoiceModal}>&times;</span>
            <h2 className="invoice-title">Invoice</h2>
            <div className="invoice-details">
              <p><strong>Invoice No:</strong> {selectedOrder.invoiceNo}</p>
              <p><strong>Order Time:</strong> {selectedOrder.orderTime}</p>
              <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.method}</p>
            </div>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>Rs {product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="invoice-total">
              <p><strong>Total Amount:</strong> Rs {selectedOrder.amount}</p>
              <p><strong>Total Amount with Tax:</strong> Rs {(selectedOrder.amount * 1.02).toFixed(2)}</p>          

            </div>
          </div>
        </div>
      )}

        
      
    </section>
  );
};

export default OrderManagement;
