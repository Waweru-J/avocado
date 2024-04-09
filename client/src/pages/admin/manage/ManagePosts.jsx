import { useState, useEffect } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

const ManagePosts = () => {
  const [avocados, setAvocados] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      const data = await api("DELETE", `auth/remove/avocado/${id}`);
      toast(data.data.message, { type: "success" });
    } catch (error) {
      console.log(error);
      toast("Error deleting Avocado", { type: "error" });
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
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowGenerateReport(!showGenerateReport)}
        >
          {showGenerateReport ? "Cancel" : "Generate Report"}
        </button>
        {showGenerateReport && (
          <CSVLink data={avocados}>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Confirm
            </button>
          </CSVLink>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th scope="col">Sr. No</th>
              <th className="border border-gray-800 px-4 py-2">Username</th>
              <th className="border border-gray-800 px-4 py-2">Email</th>
              <th className="border border-gray-800 px-4 py-2">Phone Number</th>
              <th className="border border-gray-800 px-4 py-2">Variety</th>
              <th className="border border-gray-800 px-4 py-2">Location</th>
              <th className="border border-gray-800 px-4 py-2">Photos</th>
              <th className="border border-gray-800 px-4 py-2">Price</th>
              <th className="border border-gray-800 px-4 py-2">
                Harvest Times
              </th>
              <th className="border border-gray-800 px-4 py-2">Farmsize</th>
              <th className="border border-gray-800 px-4 py-2">
                ProduceQuality
              </th>
              <th className="border border-gray-800 px-4 py-2">Description</th>
              <th className="border border-gray-800 px-4 py-2">Date</th>
              {!showGenerateReport && (
                <th className="border border-gray-800 px-4 py-2 hidden md:table-cell">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {avocados.map((avocado, index) => (
              <tr key={index}>
                <td className="border border-gray-800 px-4 py-2">
                  {avocado + 1}
                </td>
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
                  {avocado.location}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  <img
                    src={avocado.photos[0]}
                    alt="Farm"
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {avocado.price}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {avocado.harvestTimes}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {avocado.farmsize}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {avocado.produceQuality}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {showFullDescription[avocado._id] ? (
                    avocado.description
                  ) : (
                    <>
                      {avocado.description.substring(0, 20)}
                      {avocado.description.length > 20 && (
                        <span
                          className="text-blue-500 cursor-pointer ml-1"
                          onClick={() => toggleDescription(avocado._id)}
                        >
                          ...Show more
                        </span>
                      )}
                    </>
                  )}
                  {showFullDescription[avocado._id] && (
                    <span
                      className="text-blue-500 cursor-pointer ml-1"
                      onClick={() => toggleDescription(avocado._id)}
                    >
                      Show less
                    </span>
                  )}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {new Date(avocado.date).toLocaleDateString()}
                </td>
                {!showGenerateReport && (
                  <td className="border border-gray-800 px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(avocado._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Area to show total count of avocados */}
      <div className="mt-4">Total Avocados: {avocados.length}</div>
    </div>
  );
};

export default ManagePosts;
