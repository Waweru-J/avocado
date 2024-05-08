import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Footer from "../components/footer/Footer.jsx";
import Card from "../components/home/SingleCard.jsx";
// import Rating from "../components/Rating.jsx";

const SingleAvocado = () => {
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchAvocado = async () => {
      try {
        const res = await api("GET", `auth/products/details/${id}`); // Corrected string interpolation
        if (res.status !== 200) {
          throw new Error(`Failed to fetch avocado: ${res.status}`);
        }
        const data = res.data;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching avocado:", error);
      }
    };

    fetchAvocado();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (product) {
          // Check if product is not null
          const res = await api("GET", `auth/reviews/${product.userId}`);
          setReviews(res.data);
          console.log("review data ");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // if (!Array.isArray(reviews) || reviews.length === 0) {
  //   return <p>No reviews available.</p>;
  // }

  const handleText = () => {
    switch (number || hoverStar) {
      case 0:
        return "Evaluate";
      case 1:
        return "Dissatisfaction";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "Evaluate";
    }
  };
  const handlePlaceHolder = () => {
    switch (number || hoverStar) {
      case 0:
        return "Comment here...";
      case 1:
      case 2:
      case 3:
      case 4:
        return "What is your problem?";
      case 5:
        return "Why do you like this Farmers' produce?";
      default:
        return "Comment here";
    }
  };

  const handleSubmitReview = async () => {
    try {
      const reviewData = {
        userId: product.userId,
        rating: number,
        comment,
        username: JSON.parse(localStorage.getItem("user")).username,
      };
      const res = await api("POST", "auth/reviews", reviewData);
      if (res.status === 200) {
        toast(res.data.message, { type: "success" });
      } else {
        toast(res.data.message, { type: "error" });
      }
      // Handle success or display a message
    } catch (error) {
      console.error("Error submitting review:", error);
      toast("Please Login to make a review.", { type: "error" });
      // Handle error or display a message
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className=" min-h-screen">
        <section>
          <div className="bg-green-50">
            <Link
              to="/"
              className="text-green-500 hover:text-green-600 flex items-center  w-full py-1 px-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Avocado Listings
            </Link>
          </div>
        </section>
        <section className="bg-green-50">
          <div className="flex w-full py-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <main className="flex-1">
                <div
                  className="bg-white grid grid-cols-1 md:grid-cols-2
        gap-4 p-4 rounded-lg"
                >
                  <Card>
                    <div className="px-6 py-4">
                      <img src={product.photos[0]} alt="" />
                    </div>
                  </Card>
                  <Card>
                    <div className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-4">
                        <h3 className="text-green-800 text-lg font-bold mb-6">
                          Farm Size:
                          <p className="text-black mt-2 my-2 bg-indigo-100 py-2 px-2 font-bold">
                            {product.farmsize} Acres
                          </p>
                        </h3>
                        <h3 className="text-green-800 text-lg font-bold mb-6">
                          Quality:
                          <p className="text-black mt-2 my-2 bg-indigo-100 py-2 font-bold">
                            {product.produceQuality}
                          </p>
                        </h3>
                        <h3 className="text-green-800 text-lg font-bold mb-6">
                          Variety:
                          <p className="text-black mt-2 my-2 bg-indigo-100 py-2 font-bold">
                            {product.variety}
                          </p>
                        </h3>
                        <h3 className="text-green-800 text-lg font-bold mb-6">
                          Price:
                          <p className="text-black mt-2 my-2 bg-indigo-100 py-2 font-bold">
                            $ {product.price}
                          </p>
                        </h3>
                      </div>
                      <div className="">
                        <div>
                          <h3 className="text-green-800 text-lg font-bold mb-6">
                            Description:
                          </h3>
                          <p className=" mb-4">{product.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="text-indigo-700 mt-0 flex items-center">
                            <FaMapMarker className="inline text-lg mt-0 text-2xl" />
                            <p className="text-indigo-900 ml-2 text-2xl">
                              {product.location}
                            </p>
                          </div>
                          <h3 className="text-green-800 text-lg font-bold mb-6">
                            Harvest will Start On Date:
                            <p className="text-gray-900 text-2xl mt-2 my-2 bg-green-100 py-2 px-3 ">
                              {product.harvestTimes}
                            </p>
                          </h3>
                        </div>
                      </div>

                      {/* <!-- Text Container --> */}
                    </div>
                  </Card>
                </div>
                <div
                  className="
         p-4 rounded-lg "
                >
                  <div className=" p-6 rounded-lg mt-6">
                    <h3 className="text-green-800 text-lg font-bold mb-6">
                      Reviews
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 p-4 rounded-lg">
                      {reviews.length === 0 ? (
                        <p>No reviews available for this product.</p>
                      ) : (
                        reviews.map((review) => (
                          <div key={review._id}>
                            <h3 className="font-bold text-1xl">
                              Reviewed by: {review.username}
                            </h3>
                            <div className="flex mb-1">
                              <h2 className="mt-2"> Rating:</h2>
                              <span style={{ display: "flex" }}>
                                {[...Array(review.rating)].map((_, index) => (
                                  <AiFillStar
                                    key={index}
                                    className="text-orange-500 mt-2 text-1xl  "
                                  />
                                ))}
                              </span>
                            </div>

                            <div className="flex">
                              <h2 className="mt-2 "> Comment:</h2>
                              <p className="text-1xl mt-2 ml-4">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </main>
              <aside className="bg-white p-6 rounded-lg shadow-md">
                <div className="">
                  <h3 className="text-xl font-bold mb-6">Farmer Info</h3>
                  <h2 className="text-2xl">{product.username}</h2>
                  <p className="mb-2">
                    If you are interested, reach me out using this contact
                    details
                  </p>
                  <hr className="mv-4" />
                  <h3 className="text-xl">Contact Email:</h3>
                  <p className="my-2 bg-green-100 p-2 font-bold">
                    {product.email}
                  </p>
                  <h3 className="text-xl">Contact Phone:</h3>
                  <p className="my-2 bg-green-100 p-2 font-bold">
                    {product.phone}
                  </p>
                </div>
                <div className="p-6 mt-6">
                  <Fragment>
                    <div className="text-center mt-5">
                      <h1 className="text-xl font-bold">{handleText()}</h1>
                      <div className="flex justify-center items-center mt-2">
                        {Array(5)
                          .fill()
                          .map((_, index) =>
                            number >= index + 1 || hoverStar >= index + 1 ? (
                              <AiFillStar
                                key={index}
                                onMouseOver={() => setHoverStar(index + 1)}
                                onMouseLeave={() => setHoverStar(undefined)}
                                className="text-orange-500 cursor-pointer"
                                onClick={() => setNumber(index + 1)}
                                value={number}
                              />
                            ) : (
                              <AiOutlineStar
                                key={index}
                                onMouseOver={() => setHoverStar(index + 1)}
                                onMouseLeave={() => setHoverStar(undefined)}
                                className="text-orange-500 cursor-pointer"
                                onClick={() => setNumber(index + 1)}
                                value={number}
                              />
                            )
                          )}
                      </div>
                    </div>
                    <div className="mt-5">
                      <textarea
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder={handlePlaceHolder()}
                        rows="5"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      ></textarea>
                    </div>
                    <div className="mt-5 flex justify-center">
                      <button
                        onClick={handleSubmitReview}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Submit
                      </button>
                    </div>
                  </Fragment>
                  {/* <h3 className="text-xl font-bold mb-6">Manage avocados</h3>
                <Link
                  to=""
                  className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Favorite
                </Link>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Notify Farmer
                </button> */}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SingleAvocado;
