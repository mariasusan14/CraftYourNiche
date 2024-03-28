import { Routes, Route } from "react-router-dom";
import Auth from './auth';
import { UserDashboard } from "./user/UserDashboard";
import { Landing } from "./landing";
import Hero from "./components/Hero/Hero";
import InventoryManagement from "./shop/InventoryManagement";
import { ShopDashboard } from "./shop/ShopDashboard";
import { AddProducts } from "./shop/AddProduct";
import OrderManagement from "./shop/OrderManagement";
import ProfileCompletion from "./shop/ProfileCompletion";
import { Customization } from "./shop/Customization";
import Product from "./pages/ProductPage/Product";
import CollabDash from "./collab/collabdash";
import ProductListing from "./pages/ProductListing/ProductListing";
import CustomerSupport from "./pages/CustomerSupport/CustomerSupport";
import CollaborationPlatform from "./shop/CollaborationPlatform";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/shopdash" element={<ShopDashboard />} />
        <Route path="/userdash" element={<UserDashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/addproduct" element={<AddProducts />} />
        <Route path="/verification" element={<ProfileCompletion />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productlisting" element={<ProductListing />} />
        <Route path="/collabdash" element={<CollabDash />} />
        <Route path="/customersupport" element={<CustomerSupport />} /> 
        <Route path="/collabdashshop" element={<CollaborationPlatform/>}/>
      </Routes> 
      
    </div>
  );
};

export default App;
