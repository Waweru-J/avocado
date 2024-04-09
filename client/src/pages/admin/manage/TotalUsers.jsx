import { useState, useEffect } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

const ManagePosts = () => {
  const [users, setUsers] = useState([]);
  const [showGenerateReport, setShowGenerateReport] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api("GET", "auth/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await api("DELETE", `auth/user/remove/${id}`);
      toast(data.data.message, { type: "success" });
    } catch (error) {
      console.log(error);
      toast("Error deleting User", { type: "error" });
    }
  };

  return (
    <div className="mt-4 p-4">
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowGenerateReport(!showGenerateReport)}
        >
          {showGenerateReport ? "Cancel" : "Generate Report"}
        </button>
        {showGenerateReport && (
          <CSVLink data={users}>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Confirm
            </button>
          </CSVLink>
        )}
      </div>
      <div className="overflow-x-auto" style={{ width: "100%" }}>
        <table className="w-full table-auto border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th scope="col">Sr. No</th>
              <th className="border border-gray-800 px-4 py-2">userId</th>
              <th className="border border-gray-800 px-4 py-2">Username</th>
              <th className="border border-gray-800 px-4 py-2">Email</th>
              <th className="border border-gray-800 px-4 py-2">Phone Number</th>
              <th className="border border-gray-800 px-4 py-2">Date</th>
              {/* Conditionally render the Action column based on showGenerateReport */}
              {!showGenerateReport && (
                <th className="border border-gray-800 px-4 py-2 hidden md:table-cell">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-800 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-800 px-4 py-2">{user._id}</td>
                <td className="border border-gray-800 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {user.phone}
                </td>
                <td className="border border-gray-800 px-4 py-2">
                  {new Date(user.date).toLocaleDateString()}
                </td>
                {/* Conditionally render the delete button based on showGenerateReport */}
                {!showGenerateReport && (
                  <td className="border border-gray-800 px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(user._id)}
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
      {/* Area to show total count of users */}
      <div className="mt-4">Total Users: {users.length}</div>
    </div>
  );
};

export default ManagePosts;
