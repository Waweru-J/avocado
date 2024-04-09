import api from "../api/axios.js";

const AvocadoLoader = async ({ params }) => {
  try {
    const res = await api("GET", `auth/products/details/${params.id}`);
    console.log(res);
    if (res.status !== 200) {
      // Check status code
      throw new Error(`Failed to fetch avocado: ${res.status}`);
    }
    const data = res.data; // Access data directly from res.data
    return data; // Return the data directly
  } catch (error) {
    console.error("Error fetching avocado:", error);
    throw error; // Rethrow the error to be handled elsewhere
  }
};

export { AvocadoLoader };
