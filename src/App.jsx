import { auth } from "../config/firebase";
import { Routes,Route } from "react-router-dom";
import {Auth} from './auth'
import { Dashboard } from "./dashboard";
import { Landing } from "./landing";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/dashboard/:userId" element={<Dashboard />}/>
      </Routes> 
      
    </div>
    
  );
};

export default App;
