import React from 'react';
import Header from './header';
import Footer from './footer';
// import ProductManagement from './ProductManagement';
// import OrderManagement from './OrderManagement';
// import InventoryManagement from './InventoryManagement';
// import Analytics from './Analytics';
// import CustomerManagement from './CustomerManagement';
// import CollaborationPlatform from './CollaborationPlatform';
// import CustomizationAcceptReject from './CustomizationAcceptReject';
// import ProfileCompletion from './ProfileCompletion';
// import Navbar from './navbar';
import { AddProducts } from '../shop/AddProduct';

export const DashboardShop = () => {
  return (
    <div className="dashboard-container">
      <Header />
      
      <div className="content">
        {/* <Navbar/>
        <ProductManagement />
        <OrderManagement />
        <InventoryManagement />
        <Analytics />
        <CustomerManagement />
        <CollaborationPlatform />
        <CustomizationAcceptReject />
        <ProfileCompletion /> */}
        {/* Add more sections for other functionalities */}
        <AddProducts/>
      </div>
      
      <Footer />
    </div>
  );
};


