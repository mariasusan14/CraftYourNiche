import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const FooterBottom = () => {
  return (
    <div className="bg-gray-700 py-4">
      <div className="container mx-auto flex justify-center items-center">
        <ul className="flex text-white text-lg mr-6">
          <li className="mr-4">
            <a href="#" className="hover:text-gray-300">
              <FaFacebook />
            </a>
          </li>
          <li className="mr-4">
            <a href="#" className="hover:text-gray-300">
              <FaYoutube />
            </a>
          </li>
          <li className="mr-4">
            <a href="#" className="hover:text-gray-300">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              <FaGithub />
            </a>
          </li>
        </ul>
        <p className="text-white text-sm">Craft Your Niche &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default FooterBottom;
