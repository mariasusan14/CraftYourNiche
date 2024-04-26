import React from "react";
import Footer from "./Footer/Footer"; // Corrected import path
import FooterBottom from "./Footer/FooterBottom"; // Corrected import path
import ProductListShop from "./ProductListShop"; // Updated import path for ProductListShop
import Header from "./Header/Header"; // Updated import path for Header
import HeaderBottom from "./Header/HeaderBottom"; 

const ShopPage = () => {
    return (
      <div>
       <Header />
        <HeaderBottom />
        {/* Your ShopPage content */}
        <ProductListShop />
        
        {/* Add the Footer components */}
        <Footer />
        <FooterBottom />
      </div>
    );
  };
  
  export default ShopPage;