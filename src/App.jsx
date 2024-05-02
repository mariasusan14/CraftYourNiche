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
import Product from "./pages/ProductPage/Product";
import CollabDash from "./collab/collabdash";
import ProductListing from "./pages/ProductListing/ProductListing";
import CustomerSupport from "./pages/CustomerSupport/CustomerSupport";
import CollaborationPlatform from "./shop/CollaborationPlatform";
import CollabDetails from "./collab/collabDetails";
import CollabProfile from "./collab/CollabProfile";
import CollabRequests from "./collab/CollabRequests";
import CustomizationShop from "./shop/Customization";
import CollaborationRequests from "./shop/CollaborationRequests";
import ShopPage from "./pages/Shoppingcart1"; // Import ShopPage component
import Data from "./Context/Data";

const App = () => {
  return (
    <div>
      <Data>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/shoppingcart" element={<ShopPage />} /> {/* Changed route for ShopPage */}
          <Route path="/shopdash" element={<ShopDashboard />} />
          <Route path="/userdash" element={<UserDashboard />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/verification" element={<ProfileCompletion />} />
          <Route path="/customization" element={<CustomizationShop />} />
          <Route path="//product/:shopId/:productId" element={<Product />} />
          <Route path="/productlisting" element={<ProductListing />} />
          <Route path="/collabdash" element={<CollabDash />} />
          <Route path="/customersupport" element={<CustomerSupport />} />  
          <Route path="/collabdashshop" element={<CollaborationPlatform/>}/>
          <Route path="/details/:shopId/:requestId/:title" element={<CollabDetails/>}/>
          <Route path="/collabprofile" element={<CollabProfile/>}/>
          <Route path="/collabrequests" element={<CollabRequests/>}/>
          <Route path="/viewcollabrequests" element={<CollaborationRequests/>}/>
        </Routes> 
      </Data>
    </div>
  );
};

export default App;
