import React from 'react';

import Footer from './footer';
// import ProductManagement from './ProductManagement';
// import OrderManagement from './OrderManagement';
// import InventoryManagement from './InventoryManagement';
// import Analytics from './Analytics';
// import CustomerManagement from './CustomerManagement';
// import CollaborationPlatform from './CollaborationPlatform';
// import CustomizationAcceptReject from './CustomizationAcceptReject';
// import ProfileCompletion from './ProfileCompletion';
// import { AddProducts } from './AddProduct';
 import Navbar from './navbar';


export const ShopDashboard = () => {
  return (
    <div className="dashboard-container">
      
      
      <div className="content">
      <Navbar/>
        {/* 
        <ProductManagement />
        <OrderManagement />
        <InventoryManagement />
        <Analytics />
        <CustomerManagement />
        <CollaborationPlatform />
        <CustomizationAcceptReject />
        <ProfileCompletion /> */}
        {/* Add more sections for other functionalities */}
        
      </div>
      
      <Footer />
    </div>
  );
};


