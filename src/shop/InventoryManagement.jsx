import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './styles/InventoryManagement.css'; 
import Navbar from './navbar';
import { db, auth } from '../config/firebase'; 
import { getDocs, query, collection, where, doc, updateDoc } from 'firebase/firestore';

const InventoryManagement = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantityToUpdate, setQuantityToUpdate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); 

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const productsQuery = query(collection(db, `shops/${userId}/products`));
      const snapshot = await getDocs(productsQuery);
      const data = [];
      snapshot.forEach(doc => {
        const productData = doc.data();
        data.push({ id: doc.id, name: productData.title, quantity: productData.quantity });
      });
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = auth.currentUser.uid;
      const productRef = doc(db, `shops/${userId}/products`, selectedProductId);
      await updateDoc(productRef, { quantity: parseInt(quantityToUpdate) });
      
      fetchStockData();
      setSelectedProductId('');
      setQuantityToUpdate('');
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === '') {
        
        fetchStockData();
      } else {
        const userId = auth.currentUser.uid;
        const productsQuery = query(collection(db, `shops/${userId}/products`), where('title', '==', searchQuery.toLowerCase()));
        const snapshot = await getDocs(productsQuery);
        const data = [];
        snapshot.forEach(doc => {
          const productData = doc.data();
          data.push({ id: doc.id, name: productData.title, quantity: productData.quantity });
        });
        setStockData(data);
      }
      setSearchQuery('');
    } catch (error) {
      console.error('Error searching stock:', error);
    }
  };

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = stockData.slice(indexOfFirstProduct, indexOfLastProduct);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="inventory-management-container">
      <Navbar/>
      <div className="inventory-management-body">
        <br />
        <br />
        <h2>Inventory Management</h2>
        <hr />
        <br />
        <div className="search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}><FaSearch /></button>
        </div>

        <div className="stock-list">
          <h3>Current Stock Levels</h3>
          <div className="stock-table">
            <div className="table-row heading">
              <div className="table-cell">Product</div>
              <div className="table-cell">Quantity</div>
              <div className="table-cell">Status</div>
            </div>
            {currentProducts.map(product => (
              <div key={product.id} className="table-row">
                <div className="table-cell">{product.name}</div>
                <div className="table-cell">{product.quantity}</div>
                <div className="table-cell" style={{ color: product.quantity === 0 ? 'red' : product.quantity < 5 ? 'orange' : 'black' }}>
                  {product.quantity === 0 ? 'Out of stock' : product.quantity < 5 ? 'Low stock' : 'In stock'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <nav>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(stockData.length / productsPerPage) }).map((_, index) => (
              <li key={index} className={index + 1 === currentPage ? 'active' : ''}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="update-stock">
          <h3>Update Stock Quantities</h3>
          <form onSubmit={handleFormSubmit} className="update-form">
            <label className="update-label" htmlFor="product">Product:</label>
            <select className="update-input" id="product" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
              <option value="">Select Product</option>
              {currentProducts.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
            <label className="update-label" htmlFor="quantity">Quantity:</label>
            <input className="update-input" type="number" id="quantity" min="0" value={quantityToUpdate} onChange={(e) => setQuantityToUpdate(e.target.value)} />
            <button type="submit" className="update-button">Update</button>
          </form>
        </div>
      </div>      
    </section>
  );
};

export default InventoryManagement;
