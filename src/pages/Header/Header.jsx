import React from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import "./Header.css"; // Import Header.css styles

const Header = ({ toggleSidenav }) => {
  return (
    <div className="bg-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/path/to/your/logo.png" alt="Craft Your Niche" className="h-8" />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav className="flex space-x-4">
              <Link
                to="/"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="-mr-2 flex md:hidden">
            <HiMenuAlt2
              className="block h-6 w-6 cursor-pointer"
              onClick={toggleSidenav}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
