import PropTypes from "prop-types";
import TotalUsers from "../manage/TotalUsers";
import ManagePosts from "../manage/ManagePosts"; // Import the ManagePosts component
import PostCategory from "../manage/PostCategory"; // Import the Categories component

const AdminBody = ({ selectedLink }) => {
  return (
    <div className="flex-1 bg-gray-200 p-8">
      {/* Render content based on the selected link */}
      {selectedLink && (
        <div>
          <h1 className="text-2xl font-semibold mb-4">{selectedLink}</h1>
          {/* You can render different components or content here based on the selected link */}
          {selectedLink === "Total Avocados" && (
            <ManagePosts /> // Render ManagePosts component when selectedLink is "Total Products"
          )}
          {selectedLink === "Avocado Categories" && (
            <PostCategory /> // Render Categories component when selectedLink is "Product Categories"
          )}
          {selectedLink === "Total Users" && (
            <TotalUsers /> // Render ManagePosts component when selectedLink is "Total Products"
          )}
        </div>
      )}
    </div>
  );
};

AdminBody.propTypes = {
  selectedLink: PropTypes.string,
};

export default AdminBody;
