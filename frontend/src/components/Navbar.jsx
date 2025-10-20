import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { RiMenu2Fill, RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <div className="flex items-center px-8 md:px-20 justify-between p-4 shadow-md bg-white">
        <div className="flex items-center gap-3">
          {/* menu on small screen size */}
          <div className="lg:hidden">
            <RiMenu2Fill
              onClick={() => setIsOpen(true)}
              className="text-3xl text-gray-800 font-bold cursor-pointer"
            />
          </div>

          {/* Sidebar Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-55 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <RiCloseLine
                onClick={() => setIsOpen(false)}
                className="text-3xl text-gray-600 cursor-pointer"
              />
            </div>

            {/* Menu Items */}
            <ul className="flex flex-col space-y-10 p-6 items-center justify-center text-lg text-gray-800">
              <li className="cursor-pointer font-light hover:text-black">
                Shop
              </li>
              <li className="cursor-pointer font-light hover:text-black">
                On Sale
              </li>
              <li className="cursor-pointer font-light hover:text-black">
                New Arrivals
              </li>
              <li className="cursor-pointer font-light hover:text-black">
                Brand
              </li>
            </ul>
          </div>
          {/* logo */}
          <div className="font-bold text-3xl md:text-4xl cursor-pointer">
            SHOP.CO
          </div>

          {/* navigation links */}
          <ul className="items-center gap-6 text-[14px] md:text-[18px] hidden lg:flex">
            <li className="cursor-pointer font-light">Shop</li>
            <li className="cursor-pointer font-light">On Sale</li>
            <li className="cursor-pointer font-light">New Arrivals</li>
            <li className="cursor-pointer font-light">Brand</li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {/* search bar desktop */}
          <div className="relative hidden md:flex">
            <input
              type="text"
              className="bg-gray-100 p-3 px-12 rounded-full w-[400px] hidden md:block outline-0"
              placeholder="Search..."
            />
            <CiSearch className="absolute right-[10%] top-1/2 transform -translate-y-1/2 text-xl md:pointer-events-none md:left-5 text-gray-600" />
          </div>
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            <CiSearch className="text-xl" />
          </button>
          {/* cart icon */}
          <div>
            <FiShoppingCart className="text-2xl text-gray-600 font-bold cursor-pointer" />
          </div>

          {/* user avatar */}
          <div>
            <FaRegUserCircle className="text-2xl text-gray-600 font-bold cursor-pointer" />
          </div>
        </div>
      </div>
      {/* mobile search bar (slide down) */}
      {/* <div
        className={`md:hidden bg-gray-100 w-full transition-all duration-300 overflow-hidden ${
          showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-full outline-none text-gray-700"
        />
      </div> */}

      <Outlet />
    </>
  );
};

export default Navbar;
