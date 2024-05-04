import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs,doc,updateDoc,getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import Navbar from './navbar'; 
import './styles/OrderManagement.css'; 

const OrderManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; 
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = auth.currentUser.uid;
        const ordersRef = collection(db, 'orders');
        const querySnapshot = await getDocs(ordersRef);
  
        const allProducts = [];
        querySnapshot.forEach(doc => {
          const orderData = doc.data();
          const orderProducts = orderData.products || [];
          orderProducts.forEach(productData => {
            const product = productData.product;
            if (product.shopId === userId) {
              const order = {
                id:doc.id,
                productId:product.productId,
                title: product.title,
                status: productData.status,
                quantity: productData.quantity,
                totalPrice: productData.quantity * product.price,
                fullName: orderData.fullName,
                contactNo: orderData.contactNo,
                shippingAddress: orderData.shippingAddress
              };
              allProducts.push(order);
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
  
  
  const filteredOrders = products.filter(order =>
    order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (statusFilter === '' || order.status === statusFilter)
  );

  // Pagination calculations
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

const handleActivityChange = async (orderId, productId, newStatus) => {
  try {
    
    const orderRef = doc(db, 'orders', orderId);
    const orderSnapshot = await getDoc(orderRef);    
    if (orderSnapshot.exists()) {
      const orderData = orderSnapshot.data();
      const updatedProducts = orderData.products.map(product => {
        if (product.product.productId === productId) {
          return { ...product, status: newStatus };
        }
        return product;
      });
      
      await updateDoc(orderRef, { products: updatedProducts }, { merge: true });
      setProducts(products.map(product => {
        if (product.id === orderId) {
          return { ...product, status: newStatus };
        }
        return product;
      }));
    } else {
      console.log('Order document does not exist');
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
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
            <option value="Shipped">Shipped</option>
          </select>
        </div>

        
        <div className="orders">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total price</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>{product.totalPrice}</td>
                  <td>{product.fullName}</td>                  
                  <td>{product.shippingAddress}</td>
                  <td>{product.contactNo}</td>
                  <td>
                    <select onChange={(e) => handleActivityChange(product.id,product.productId, e.target.value)}>
                    <option value="">{product.status}</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Shipped">Shipped</option>
                    </select>
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
    </section>
  );
};

export default OrderManagement;
