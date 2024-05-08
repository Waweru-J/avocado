import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const AdminNav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <nav className="bg-green-700 py-4 px-6">
      <ul className="flex justify-between items-center">
        <li>
          <Link
            to="/admin/page"
            className="text-white flex items-center text-2xl"
          >
            ADMINSTRATOR
          </Link>
        </li>
        <li>
          <h className="text-white text-2xl ">
            AVOCADO FARMER-BUYER LOCATION SYSTEM
          </h>
        </li>
        <li>
          <Link
            to=""
            onClick={handleLogout}
            className="text-white flex items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
