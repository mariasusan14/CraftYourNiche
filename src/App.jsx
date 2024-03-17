import { auth } from "./config/firebase";
import { Routes,Route } from "react-router-dom";
import Auth from './auth'
import { Dashboard } from "./dashboard";
import { Landing } from "./landing";
import Hero from "./components/Hero/Hero";
import { DashboardShop } from "./shop/dashboardshop";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/" element={<Hero/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/dashboardshop/:userId" element={<DashboardShop />}/>
      </Routes> 
      
    </div>
    
  );
};

export default App;
