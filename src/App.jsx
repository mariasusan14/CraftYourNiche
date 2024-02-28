import { auth } from "../config/firebase";
import { Routes,Route } from "react-router-dom";
import {Auth} from './auth'
import { Dashboard } from "./dashboard";
import { Landing } from "./landing";
import Hero from "./components/Hero/Hero";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/dashboard/:userId" element={<Dashboard />}/>
        <Route path="/auth" element={<Hero/>}/>
      </Routes> 
      
    </div>
    
  );
};

export default App;
