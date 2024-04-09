import { useState } from "react";
import PropTypes from "prop-types";

const AdminSidebar = ({ setSelectedLink }) => {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [showCustomersDropdown, setShowCustomersDropdown] = useState(false);

  const toggleDropdown = (dropdownName) => {
    switch (dropdownName) {
      case "products":
        setShowProductsDropdown(!showProductsDropdown);
        break;
      case "orders":
        setShowOrdersDropdown(!showOrdersDropdown);
        break;
      case "customers":
        setShowCustomersDropdown(!showCustomersDropdown);
        break;
      default:
        break;
    }
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="bg-indigo-700 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        {/* Products Dropdown */}
        <div>
          <button
            className="flex justify-between w-full py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            onClick={() => toggleDropdown("products")}
          >
            Users Uploads
            <svg
              className={`h-4 w-4 transform ${
                showProductsDropdown ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showProductsDropdown && (
            <div className="pl-8">
              {/* <a
                href="#"
                className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => handleLinkClick("Total Avocados")}
              >
                Total Avocados
              </a> */}
              <a
                href="#"
                className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => handleLinkClick("Avocado Categories")}
              >
                Avocado Categories
              </a>
            </div>
          )}
        </div>
        {/* Orders Dropdown
        <div>
          <button
            className="flex justify-between w-full py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            onClick={() => toggleDropdown("orders")}
          >
            Orders
            <svg
              className={`h-4 w-4 transform ${
                showOrdersDropdown ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showOrdersDropdown && (
            <div className="pl-8">
              <a
                href="#"
                className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => handleLinkClick("Total Orders")}
              >
                Total Orders
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => handleLinkClick("Pending Orders")}
              >
                Pending Orders
              </a>
            </div>
          )}
        </div>
        {/* Customers Dropdown */}
        <div>
          <button
            className="flex justify-between w-full py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            onClick={() => toggleDropdown("customers")}
          >
            System Users
            <svg
              className={`h-4 w-4 transform ${
                showCustomersDropdown ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showCustomersDropdown && (
            <div className="pl-8">
              <a
                href="#"
                className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => handleLinkClick("Total Users")}
              >
                Total Users
              </a>
              {/* <a
                href="#"
                className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => handleLinkClick("Customer Categories")}
              >
                Customer Categories
              </a> */}
            </div>
          )}
        </div>
      </nav>
      {/* Profile Section */}
      <div className="mt-auto p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            {/* Placeholder for user avatar */}
            <img
              className="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/50"
              alt="User Avatar"
            />
          </div>
          <div>
            {/* User name and role */}
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-gray-400 text-xs">Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminSidebar.propTypes = {
  setSelectedLink: PropTypes.func.isRequired,
};

export default AdminSidebar;
