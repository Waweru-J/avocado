import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import profile from "../../../assets/images/profilepic.svg";

const FarmerSidebar = ({ setSelectedLink }) => {
  const { authUser, setAuthUser, setToken } = useContext(AuthContext);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthUser(null);
    setToken(null);
    navigate("/signup");
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  if (!authUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-green-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <Link
          to="/"
          className={`text-2xl flex justify-between w-full py-2 px-4 text-white-800 hover:bg-indigo-600 hover:text-white focus:outline-none`}
        >
          Home Page
        </Link>
      </div>
      <nav className="mt-4">
        {/* Profile Dropdown */}
        <div>
          <button
            className="flex justify-between w-full py-2 px-4 text-white-800 hover:bg-indigo-600 hover:text-white focus:outline-none"
            onClick={toggleProfileDropdown}
          >
            Profile
            <svg
              className={`h-4 w-4 transform ${
                showProfileDropdown ? "rotate-180" : "rotate-0"
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
          {showProfileDropdown && (
            <div className="pl-8">
              <Link
                to=""
                className="block py-2 px-4 text-white-800 hover:bg-indigo-600 hover:text-white"
                onClick={() => handleLinkClick("Profile")}
              >
                View Profile
              </Link>
              {/* <Link
                to=""
                className="block py-2 px-4 text-white-800 hover:bg-indigo-600 hover:text-white"
                onClick={() => handleLinkClick("Edit Profile")}
              >
                Edit Profile
              </Link> */}
            </div>
          )}
        </div>

        {/* Post Avocados Link */}
        <div>
          <Link
            to=""
            className={`flex justify-between w-full py-2 px-4 text-white-800 hover:bg-indigo-600 hover:text-white focus:outline-none`}
            onClick={() => handleLinkClick("Post Avocados")}
          >
            Post Avocados
          </Link>
        </div>

        {/* See Your Uploads Link */}
        <div>
          <Link
            to=""
            className={`flex justify-between w-full py-2 px-4 text-white-800 hover:bg-indigo-600 hover:text-white focus:outline-none`}
            onClick={() => handleLinkClick("See Your Uploads")}
          >
            See Your Uploads
          </Link>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="mt-auto p-4 border-t border-white-700">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            {/* Placeholder for user avatar */}
            <img
              className="w-20 h-20 rounded-full"
              src={profile}
              alt="User Avatar"
            />
          </div>
          <div>
            <div className="text-2xl font-bold">{authUser.username}</div>
          </div>
        </div>
        <div className="profile-actions">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-1/2 focus:outline-none  mt-10 block"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

FarmerSidebar.propTypes = {
  setSelectedLink: PropTypes.func.isRequired,
};

export default FarmerSidebar;
