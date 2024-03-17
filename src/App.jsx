import { auth } from "../config/firebase";
import { Routes,Route } from "react-router-dom";
import Auth from './auth'
import { Dashboard } from "./dashboard";
import { Landing } from "./landing";
import Hero from "./components/Hero/Hero";
import ShopDashboard from "./shop/dashboard";
import InventoryManagement from "./shop/InventoryManagement";
import OrderManagement from "./shop/OrderManagement";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/dashboard/:userId" element={<Dashboard />}/>
        <Route path="/auth" element={<Hero/>}/>
        <Route path="/shopdash" element={<ShopDashboard/>}/>
        <Route path="/inventory" element={<InventoryManagement/>}/>
        <Route path="/orders" element={<OrderManagement/>}/>
      </Routes> 
      
    </div>
    
  );
};

export default App;
