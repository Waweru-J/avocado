import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AvocadoListing = ({ avocado }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = avocado.description;
  if (!showFullDescription) {
    description = description.substring(0, 50) + "...";
  }

  return (
    <Fragment>
      <div className="bg-white rounded-xl shadow-md relative border border-gray-300 rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-lg hover:border-orange-500">
        <div className="p-4">
          <div className="mb-3">
            <img
              src={avocado.photos[0]}
              alt={avocado.variety}
              className="w-full rounded-lg"
              style={{
                width: "100%",
                height: "150px",
              }}
            />
            <div className="text-gray-600 my-2">{avocado.variety}</div>
            <h3 className="text-xl font-bold">Joseph</h3>
          </div>
          <div className="mb-5">{description}</div>
          <button
            onClick={() => setShowFullDescription((prevState) => !prevState)}
            className="text-green-500 mb-5 hover:text-green-600"
          >
            {showFullDescription ? "less" : "more"}
          </button>
          <h3 className="text-green-500 mb-2">{avocado.farmsize} Acres</h3>
          <div className="border border-gray-100 mb-5"></div>
          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="text-orange-700 mb-3">
              <FaMapMarker className="inline text-lg mb-1" />
              {avocado.location}
            </div>
            <NavLink
              to={`/details/${avocado._id}`}
              className="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
              Read More
            </NavLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AvocadoListing.propTypes = {
  avocado: PropTypes.object.isRequired,
};

export default AvocadoListing;
