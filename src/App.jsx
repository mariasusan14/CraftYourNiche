import { Routes,Route } from "react-router-dom";
import Auth from './auth'
import { UserDashboard } from "./user/UserDashboard";
import { Landing } from "./landing";
import Hero from "./components/Hero/Hero";
import InventoryManagement from "./shop/InventoryManagement";
import { ShopDashboard } from "./shop/ShopDashboard";
import { AddProducts } from "./shop/AddProduct";
import OrderManagement from "./shop/OrderManagement";
import ProfileCompletion from "./shop/ProfileCompletion";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/" element={<Hero/>}/>
        <Route path="/auth" element={<Auth/>}/>        
        <Route path="/shopdash" element={<ShopDashboard/>}/>
        <Route path="/userdash" element={<UserDashboard/>}/>
        <Route path="/inventory" element={<InventoryManagement/>}/>
        <Route path="/orders" element={<OrderManagement/>}/>
        <Route path="/addproduct" element={<AddProducts />}/>
        <Route path="/verification" element={<ProfileCompletion />}/>        
      </Routes> 
      
    </div>
    
  );
};

export default App;
