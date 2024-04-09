import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../api/axios";
import { CSVLink } from "react-csv";

const CategoriesPage = () => {
  const [avocados, setAvocados] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState({});

  useEffect(() => {
    const fetchAvocados = async () => {
      try {
        const res = await api("GET", "auth/avocados");
        setAvocados(res.data);
      } catch (error) {
        console.error("Error fetching avocados:", error);
      }
    };

    fetchAvocados();
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedCategory, avocados]);

  const filterData = () => {
    setFilteredData(
      selectedCategory === "All"
        ? avocados
        : avocados.filter((avocado) => avocado.variety === selectedCategory)
    );
  };

  const handleDelete = async (id) => {
    try {
      await api("DELETE", `auth/remove/avocado/${id}`);
      toast("Avocado deleted successfully", { type: "success" });
      setAvocados(avocados.filter((avocado) => avocado.id !== id));
    } catch (error) {
      console.log(error);
      toast("Error deleting Avocado", { type: "error" });
    }
  };

  const generateReportData = () => {
    if (selectedCategory === "All") {
      return avocados;
    } else {
      return filteredData;
    }
  };

  const toggleDescription = (id) => {
    setShowFullDescription({
      ...showFullDescription,
      [id]: !showFullDescription[id],
    });
  };

  return (
    <div>
      {/* <h1 className="text-3xl font-semibold mb-4">Avocado Categories</h1> */}
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowGenerateReport(!showGenerateReport)}
        >
          {showGenerateReport ? "Cancel" : "Generate Report"}
        </button>
        {showGenerateReport && (
          <CSVLink data={generateReportData()}>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Confirm
            </button>
          </CSVLink>
        )}
      </div>
      <div className="mb-4">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`mr-2 border rounded-md px-2 py-1 ${
            selectedCategory === "All" ? "bg-blue-500 text-white" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory("Fuerte")}
          className={`mr-2 border rounded-md px-2 py-1 ${
            selectedCategory === "Fuerte" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Fuerte
        </button>
        <button
          onClick={() => setSelectedCategory("Hass")}
          className={`mr-2 border rounded-md px-2 py-1 ${
            selectedCategory === "Hass" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Hass
        </button>
        <button
          onClick={() => setSelectedCategory("Reed")}
          className={`mr-2 border rounded-md px-2 py-1 ${
            selectedCategory === "Reed" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Reed
        </button>
      </div>
      <table className="table-auto border-collapse border border-gray-800">
        <thead>
          <tr>
            <th scope="col">Sr. No</th>
            <th className="border border-gray-800 px-4 py-2">Username</th>
            <th className="border border-gray-800 px-4 py-2">Email</th>
            <th className="border border-gray-800 px-4 py-2">Phone Number</th>
            <th className="border border-gray-800 px-4 py-2">Variety</th>
            <th className="border border-gray-800 px-4 py-2">Photo</th>
            <th className="border border-gray-800 px-4 py-2">Location</th>
            <th className="border border-gray-800 px-4 py-2">Harvest Times</th>
            <th className="border border-gray-800 px-4 py-2">Farmsize</th>
            <th className="border border-gray-800 px-4 py-2">Price</th>
            <th className="border border-gray-800 px-4 py-2">ProduceQuality</th>
            <th className="border border-gray-800 px-4 py-2">Description</th>
            <th className="border border-gray-800 px-4 py-2">Date</th>
            <th className="border border-gray-800 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((avocado, index) => (
            <tr key={index}>
              <td className="border border-gray-800 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.username}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.email}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.phone}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.variety}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                <img
                  src={avocado.photos[0]}
                  alt="Farm"
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.location}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.harvestTimes}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.farmsize}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.price}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {avocado.produceQuality}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {showFullDescription[avocado.id] ? (
                  avocado.description
                ) : (
                  <>
                    {avocado.description.substring(0, 20)}
                    {avocado.description.length > 20 && (
                      <span
                        className="text-blue-500 cursor-pointer ml-1"
                        onClick={() => toggleDescription(avocado.id)}
                      >
                        ...View More
                      </span>
                    )}
                  </>
                )}
                {showFullDescription[avocado.id] && (
                  <span
                    className="text-blue-500 cursor-pointer ml-1"
                    onClick={() => toggleDescription(avocado.id)}
                  >
                    View Less
                  </span>
                )}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {new Date(avocado.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                <button
                  onClick={() => handleDelete(avocado.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
