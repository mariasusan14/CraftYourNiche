import React from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import "./Header.css";

const Header = ({ toggleSidenav }) => {
  return (
    <header className="header bg-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="logo">
            <Link to="/">
              <img src="/path/to/your/logo.png" alt="Craft Your Niche" className="h-8" />
            </Link>
          </div>

          <div className="nav-menu hidden md:block">
            <nav className="flex space-x-4">
              <Link
                to="/"
                className="nav-link text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="nav-link text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="nav-link text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="mobile-menu -mr-2 flex md:hidden">
            <HiMenuAlt2
              className="menu-icon block h-6 w-6 cursor-pointer"
              onClick={toggleSidenav}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
