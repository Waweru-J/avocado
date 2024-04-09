import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from "react";
import AvocadoListing from "./AvocadoListing.jsx";
import api from "../api/axios.js";
import SearchInput from "../components/SearchInput.jsx";

const AvocadoListings = ({ isHome = false }) => {
  const [avocados, setAvocados] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeVariety, setActiveVariety] = useState("All Varieties");

  useEffect(() => {
    const fetchAvocados = async () => {
      try {
        const res = await api("GET", "auth/avocados");
        const fetchedItems = res.data.reverse();
        setAvocados(fetchedItems);
        filterItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching avocados:", error);
      }
    };

    fetchAvocados();
  }, []);

  useEffect(() => {
    filterItems(avocados);
  }, [avocados]);

  const filterItems = (items) => {
    setFilteredItems(items);
  };

  const onSearch = (query) => {
    const filtered = avocados.filter(
      (item) =>
        item.location.toLowerCase().includes(query.toLowerCase()) ||
        item.variety.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
    setActiveVariety("All Varieties"); // Reset variety filter when searching
  };

  const handleClick = (variety) => {
    if (variety === "All Varieties") {
      filterItems(avocados);
    } else {
      const filtered = avocados.filter((item) => item.variety === variety);
      setFilteredItems(filtered);
    }
    setActiveVariety(variety);
  };

  const avocadoListings = isHome ? avocados.slice(0, 5) : avocados;

  const displayedAvocadoListings = isHome ? avocadoListings : filteredItems;

  return (
    <Fragment>
      <section className="bg-blue-50 px-10 py-0">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <h2
              className={`text-3xl font-bold text-green-500 mb-6 text-center ${
                !isHome ? "md:text-right " : " text-right"
              }`}
            >
              {isHome ? "Recent Avocados" : "Browse Avocados"}
            </h2>
            <div className="mb-2">
              {!isHome && <SearchInput onSearch={onSearch} />}
            </div>
          </div>
          {!isHome && (
            <div className="button-container flex justify-center mb-6 space-x-4">
              <button
                className={`btn ${
                  activeVariety === "All Varieties"
                    ? "bg-green-500 text-white font-semibold py-1 px-4 rounded-lg"
                    : "bg-gray-200 text-gray-700 font-semibold py-1 px-4 rounded-lg"
                } hover:bg-green-600 hover:text-white`}
                onClick={() => handleClick("All Varieties")}
              >
                All Varieties
              </button>
              <button
                className={`btn ${
                  activeVariety === "Hass"
                    ? "bg-green-500  text-white font-semibold py-1 px-4 rounded-lg "
                    : "bg-gray-200  text-gray-700 font-semibold py-1 px-4 rounded-lg"
                } hover:bg-green-600 hover:text-white`}
                onClick={() => handleClick("Hass")}
              >
                Hass
              </button>
              <button
                className={`btn ${
                  activeVariety === "Fuerte"
                    ? "bg-green-500  text-white font-semibold py-1 px-4 rounded-lg"
                    : "bg-gray-200 text-gray-700 font-semibold py-1 px-4 rounded-lg"
                } hover:bg-green-600 hover:text-white`}
                onClick={() => handleClick("Fuerte")}
              >
                Fuerte
              </button>
              <button
                className={`btn ${
                  activeVariety === "Reed"
                    ? "bg-green-500  text-white font-semibold py-1 px-4 rounded-lg"
                    : "bg-gray-200  text-gray-700 font-semibold py-1 px-4 rounded-lg"
                } hover:bg-green-600 hover:text-white`}
                onClick={() => handleClick("Reed")}
              >
                Reed
              </button>
            </div>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gridGap: "30px",
            }}
          >
            {displayedAvocadoListings.length === 0 ? (
              <p>No items found.</p>
            ) : (
              displayedAvocadoListings.map((avocado) => (
                <AvocadoListing key={avocado._id} avocado={avocado} />
              ))
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

AvocadoListings.propTypes = {
  isHome: PropTypes.bool,
};

export default AvocadoListings;
