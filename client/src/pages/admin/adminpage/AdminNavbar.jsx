import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const AdminNav = () => {
  return (
    <nav className="bg-indigo-700 py-4 px-6">
      <ul className="flex justify-between items-center">
        <li>
          <Link to="/admin" className="text-white flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="text-white flex items-center text-3xl"
          >
            Manage Users and User Post
          </Link>
        </li>
        <li>
          <Link to="/logout" className="text-white flex items-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
