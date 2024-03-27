// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom'
// ... rest of the component

export const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">Craft-Your-Niche</div>
      <ul className="nav-menu">
        <li>Home</li>
        <li>Explore</li>
        <li>About</li>
        <li><Dropdown/></li>
        <li className='nav-contact'><Link className='nav-contact--link' to="/customersupport">Contact</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;

function Dropdown(){
  const [open,setOpen] = useState(false)

  return (
    <div onMouseEnter={()=>{setOpen(!open)}} onMouseLeave={()=>{setOpen(!open)}}>
      Products
      {open && (
      <div className='nav-products--dropdown'>
        <DropdownItem value="Traditional" link="https://www.youtube.com"/>
        <DropdownItem value="Modern"/>
      </div>
      )}
    </div>
  
      )

}
function DropdownItem({value,link}){
  return(
    <ul>
      <Link to={link}><div className='nav-products--dropdownitem'>{value}</div></Link>
    </ul>
  )
}