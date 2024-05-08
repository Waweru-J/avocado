import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="bg-green-700 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Manage</h2>
      </div>
      <nav className="mt-4">
        {/* Products Dropdown */}
        <div>
          <button
            className="flex justify-between w-full py-2 px-4  hover:bg-gray-700 hover:text-white focus:outline-none"
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
                className="block py-2 px-4 text-gray-200 hover:bg-gray-700 hover:text-white"
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
            className="flex justify-between w-full py-2 px-4  hover:bg-gray-700 hover:text-white focus:outline-none"
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
                className="block py-2 px-4 text-gray-200 hover:bg-gray-700 hover:text-white"
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
            <FontAwesomeIcon icon={faUser} className="mr-2 mt-3" />
          </div>
          <div>
            {/* User name and role */}
            <div className="mt-2 text-sm font-medium">{admin.username}</div>
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
