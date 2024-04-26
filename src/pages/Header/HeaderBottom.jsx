import React from "react";
import "./Header.css";

const HeaderBottom = () => {
  return (
    <div className="footer bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div>
          <p className="welcome-text text-sm">Welcome to Craft Your Niche Shop!</p>
        </div>
        <div>
          <button className="shop-button px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
