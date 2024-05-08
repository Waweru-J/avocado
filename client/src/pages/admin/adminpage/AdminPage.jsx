import { Fragment, useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminBody from "./AdminBody";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin"); // Redirect to the login page
    }
  }, [navigate]);

  if (!localStorage.getItem("adminToken")) {
    return null; // Or you can render a loading spinner or a message
  }

  return (
    <Fragment>
      <AdminNavbar />
      <div className="flex h-screen">
        <AdminSidebar setSelectedLink={setSelectedLink} />
        {/* Pass the selectedLink prop to AdminBody */}
        <AdminBody selectedLink={selectedLink} />
      </div>
    </Fragment>
  );
};

export default AdminPage;
