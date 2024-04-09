import { Fragment, useState, useEffect } from "react";
import api from "../api/axios.js";
import ImageUpload from "../utils/ImageUpload";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    variety: "",
    location: "",
    photos: [],
    harvestTimes: "",
    farmsize: "",
    description: "",
    price: "",
    produceQuality: "",
    userId: JSON.parse(localStorage.getItem("user"))._id,
    phone: JSON.parse(localStorage.getItem("user")).phone,
    username: JSON.parse(localStorage.getItem("user")).username,
    email: JSON.parse(localStorage.getItem("user")).email,
  });
  const [uploadAnim, setUploadAnim] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        if (key === "photos") {
          for (let i = 0; i < formData[key].length; i++) {
            formDataToSend.append(key, formData[key][i]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      // Append userId from formData to formDataToSend

      console.log("Request Body:", Object.fromEntries(formDataToSend));
      const res = await api("POST", "auth/sell", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Avocado ad data submitted:", res.data);

      if (res.status === 200) {
        toast("Sell ad data submitted", { type: "success" });
        navigate("/");
      } else {
        toast("Error posting data. Please try again.", { type: "error" });
      }
    } catch (error) {
      toast("Error submitting data.", { type: error.message });
    }
  };

  useEffect(() => {
    const uploadImages = async () => {
      setUploadAnim(true);
      const images = [];
      for (let i = 0; i < formData.photos.length; i++) {
        const uploadedImage = await ImageUpload(formData.photos[i]);
        images.push(uploadedImage);
      }
      return images;
    };

    const updateFormData = async () => {
      const images = await uploadImages();
      if (JSON.stringify(images) !== JSON.stringify(formData.photos)) {
        setFormData((prevFormData) => ({ ...prevFormData, photos: images }));
      }
      setUploadAnim(false);
    };

    updateFormData();
  }, [formData.photos]);

  return (
    <Fragment>
      {/* <Toaster position="top-right"></Toaster> */}

      <div className="bg-gray-200 min-h-screen py-6  flex-col justify-center sm:py-12">
        <div className="relative py-3  sm:mx-auto" style={{ width: "70%" }}>
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className=" mx-auto" style={{ width: "100%" }}>
              <form
                onSubmit={handleSubmit}
                className="space-y-10 divide-y divide-gray-200"
                encType="multipart/form-data"
              >
                <div className="space-y-6 divide-y divide-gray-200 sm:divide-y-0 sm:space-y-0 sm:flex sm:space-x-14">
                  <div className="w-full space-y-10">
                    <div>
                      <label
                        htmlFor="variety"
                        className="text-sm font-bold text-gray-700 block"
                      >
                        Variety:
                      </label>
                      <select
                        id="variety"
                        name="variety"
                        value={formData.variety}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select Variety</option>
                        <option value="Hass">Hass</option>
                        <option value="Fuerte">Fuerte</option>
                        <option value="Reed">Reed</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="text-sm font-bold text-gray-700 block"
                      >
                        Location:
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select Location</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Busia">Busia</option>
                        <option value="Baringo">Baringo</option>
                        <option value="Nyeri">Nyeri</option>
                        <option value="Machakos">Machakos</option>
                        <option value="Voi">Voi</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="farmsize"
                        className="text-sm font-bold text-gray-700 block"
                      >
                        Farm Size:
                      </label>
                      <input
                        type="text"
                        id="farmsize"
                        name="farmsize"
                        value={formData.farmsize}
                        onChange={handleChange}
                        required
                        placeholder="Enter farm size"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="text-sm font-bold text-gray-700 block"
                      >
                        Description:
                      </label>
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Enter description"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="w-full space-y-10">
                    <div className="image_showcase">
                      {uploadAnim ? (
                        <p className="text-sm text-gray-600">
                          Uploading Image...
                        </p>
                      ) : Array.isArray(formData.photos) ? (
                        formData.photos.map((photo) => (
                          <div
                            key={photo}
                            className="w-32 h-20 mr-2 mb-2 overflow-hidden rounded-lg shadow-md"
                          >
                            <img
                              className="object-cover w-full h-full"
                              src={photo}
                              alt=""
                            />
                          </div>
                        ))
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="photos"
                        className="text-sm font-bold text-gray-700 block"
                      >
                        Photos:
                      </label>
                      <input
                        type="file"
                        id="photos"
                        name="photos"
                        onChange={handleFileChange}
                        multiple
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="harvest-times"
                        className="text-sm font-bold text-gray-700 block"
                      >
                        Harvest Times:
                      </label>
                      <input
                        type="date"
                        id="harvest-times"
                        name="harvestTimes"
                        value={formData.harvestTimes}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="produce-quality"
                        className="text-sm font-bold text-gray-700 block"
                      >
                        Produce Quality:
                      </label>
                      <select
                        id="produce-quality"
                        name="produceQuality"
                        value={formData.produceQuality}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select Quality</option>
                        <option value="organic">Organic</option>
                        <option value="conventional">Conventional</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="text-sm font-bold text-gray-700 block"
                      >
                        Price ($):
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="Enter price"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-1/2 py-3 mt-0 font-medium tracking-widest text-white uppercase bg-green-500 shadow-lg focus:outline-none hover:bg-green-700 hover:shadow-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Sell;
