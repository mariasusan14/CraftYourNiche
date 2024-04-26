import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/4">
          <h2 className="text-lg font-bold mb-4">About Us</h2>
          <p className="text-sm">
            Craft Your Niche is your one-stop destination for all your crafting needs. We provide high-quality craft supplies and tools to help you unleash your creativity.
          </p>
          <div className="flex mt-4">
            <a href="#" className="mr-4">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="#" className="mr-4">
              <FaYoutube className="text-2xl" />
            </a>
            <a href="#" className="mr-4">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="#">
              <FaGithub className="text-2xl" />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/4 mt-8 md:mt-0">
          <h2 className="text-lg font-bold mb-4">Shop</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">Accessories</a></li>
            <li className="mb-2"><a href="#">Clothes</a></li>
            <li className="mb-2"><a href="#">Electronics</a></li>
            <li className="mb-2"><a href="#">Home appliances</a></li>
            <li><a href="#">New Arrivals</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mt-8 md:mt-0">
          <h2 className="text-lg font-bold mb-4">Your Account</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">Profile</a></li>
            <li className="mb-2"><a href="#">Orders</a></li>
            <li className="mb-2"><a href="#">Addresses</a></li>
            <li><a href="#">Payments</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mt-8 md:mt-0">
          <h2 className="text-lg font-bold mb-4">Help</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">Contact Us</a></li>
            <li className="mb-2"><a href="#">Shipping</a></li>
            <li className="mb-2"><a href="#">Returns & Exchange</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-gray-700 pt-4 text-sm text-center">
        <p>&#169; {new Date().getFullYear()} Craft Your Niche. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
