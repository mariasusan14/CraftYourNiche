import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './styles/InventoryManagement.css'; 
import Navbar from './navbar';

const InventoryManagement = () => {
  // Placeholder data for stock levels
  const [stockData, setStockData] = useState([
    { id: 1, name: 'Product A', quantity: 50 },
    { id: 2, name: 'Product B', quantity: 20 },
    { id: 3, name: 'Product C', quantity: 10 },
    { id: 4, name: 'Product D', quantity: 30 },
    { id: 5, name: 'Product E', quantity: 25 },
    { id: 6, name: 'Product F', quantity: 0 },
    { id: 7, name: 'Product G', quantity: 4 },
    
  ]);

  
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantityToUpdate, setQuantityToUpdate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = stockData.slice(indexOfFirstProduct, indexOfLastProduct);

  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    
    const selectedProduct = stockData.find(product => product.id === parseInt(selectedProductId));

    if (selectedProduct) {
      
      const updatedStockData = stockData.map(product => {
        if (product.id === selectedProduct.id) {
          return { ...product, quantity: parseInt(quantityToUpdate) };
        }
        return product;
      });

      
      setStockData(updatedStockData);

      
      setSelectedProductId('');
      setQuantityToUpdate('');
    }
  };

  
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      
      setStockData(stockData);
    } else {
      
      const filteredData = stockData.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setStockData(filteredData);
    }
    setSearchQuery('');
  };

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (

    
    <section className="inventory-management-container">
      <Navbar/>
      <div className="inventory-management-body">
      <h2>Inventory Management</h2>
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
            <div className="table-cell">Product Name</div>
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
            
            {stockData.map(product => (
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
