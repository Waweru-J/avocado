import { Fragment, useState } from "react";
import FarmerSidebar from "./Sidebar";
import MainBody from "./Mainbody";
import Footer from "../../../components/footer/Footer";

const FarmerDashboard = () => {
  const [selectedLink, setSelectedLink] = useState(null);

  return (
    <Fragment>
      <div
        className="flex flex-cols-1 md:flex-cols-2
      min-h-screen"
      >
        {/* Farmer Sidebar */}
        <FarmerSidebar setSelectedLink={setSelectedLink} />

        {/* Main Body */}
        <MainBody selectedLink={selectedLink} />

        {/* Footer */}
      </div>
      <Footer className="mt-auto" />
    </Fragment>
  );
};

export default FarmerDashboard;
