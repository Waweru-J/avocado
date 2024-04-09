import PropTypes from "prop-types";
import AddAvocado from "../../AddAvocado";
import Uploads from "../uploads/Uploads";
import ProfilePage from "./ProfilePage";

const MainBody = ({ selectedLink }) => {
  return (
    <div className="flex-1 bg-gray-200 p-8">
      <div>
        {selectedLink === "Post Avocados" || !selectedLink ? (
          <AddAvocado />
        ) : selectedLink === "See Your Uploads" ? (
          <Uploads />
        ) : selectedLink === "Profile" ? ( // Render ProfilePage for "Profile" link
          <ProfilePage />
        ) : (
          <div>
            <h1 className="text-2xl font-semibold mb-4">{selectedLink}</h1>
            {/* Render content based on the selected link */}
            {selectedLink === "See Your Uploads" && (
              <div>
                {/* Content for See Your Uploads */}
                <p>This is the content for See Your Uploads.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

MainBody.propTypes = {
  selectedLink: PropTypes.string,
};

export default MainBody;
