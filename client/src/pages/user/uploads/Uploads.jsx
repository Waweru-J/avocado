import { useState, useEffect, useContext } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../store/AuthProvider";

const AdminSidebar = () => {
  const [avocados, setAvocados] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (authUser) {
      const fetchAvocados = async () => {
        try {
          const res = await api("GET", `auth/avocados/${authUser._id}`);
          setAvocados(res.data);
        } catch (error) {
          console.error("Error fetching avocados:", error);
        }
      };

      fetchAvocados();
    }
  }, [authUser]);

  const handleDelete = async (id) => {
    try {
      const data = await api("DELETE", `auth/remove/avocado/${id}`);
      toast(data.data.message, { type: "success" });
    } catch (error) {
      console.log(error);
      toast("Error deleting Avocado", { type: "error" });
    }
  };

  const [showFullDescription, setShowFullDescription] = useState({});

  const toggleDescription = (id) => {
    setShowFullDescription({
      ...showFullDescription,
      [id]: !showFullDescription[id],
    });
  };
  if (!authUser) {
    return <p>Please sign in to view your uploads.</p>;
  }

  if (!Array.isArray(avocados) || avocados.length === 0) {
    return <p>You have not uploaded any items yet.</p>;
  }
  return (
    <div className="mt-4 p-4">
      <h3 className="text-lg font-semibold mb-2">Your Uploads</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-800 px-4 py-2">Variety</th>
              <th className="border border-gray-800 px-4 py-2">Location</th>
              <th className="border border-gray-800 px-4 py-2">Photos</th>
              <th className="border border-gray-800 px-4 py-2">
                Harvest Times
              </th>
              <th className="border border-gray-800 px-4 py-2">Farmsize</th>
              <th className="border border-gray-800 px-4 py-2">Description</th>
              <th className="border border-gray-800 px-4 py-2">Price</th>
              <th className="border border-gray-800 px-4 py-2">
                Produce Quality
              </th>
              <th className="border border-gray-800 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {avocados.map((avocado) => (
              <tr key={avocado._id}>
                <td className="border border border-gray-300 px-4 py-2">
                  {avocado.variety}
                </td>
                <td className="border border border-gray-300 px-4 py-2">
                  {avocado.location}
                </td>
                <td className="border border border-gray-300 px-4 py-2">
                  <img
                    src={avocado.photos[0]}
                    alt="Farm"
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border border border-gray-300 px-4 py-2">
                  {avocado.harvestTimes}
                </td>
                <td className="border border border-gray-300 px-4 py-2">
                  {avocado.farmsize}
                </td>
                <td className="border border border-gray-300 px-4 py-2">
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
                <td className="border border border-gray-300 px-4 py-2">
                  {avocado.price}
                </td>
                <td className="border border border-gray-300 px-4 py-2">
                  {avocado.produceQuality}
                </td>
                <td className="border border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(avocado._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSidebar;
