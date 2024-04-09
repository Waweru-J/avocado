import { Fragment, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminBody from "./AdminBody";
import AdminNavbar from "./AdminNavbar";

const AdminPage = () => {
  const [selectedLink, setSelectedLink] = useState(null);

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
