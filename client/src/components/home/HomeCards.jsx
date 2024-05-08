import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";
const HomeCards = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  const handleSellAvocado = () => {
    if (!authUser) {
      navigate("/signup");
    } else {
      navigate("/farmpage");
    }
  };
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-2
        gap-4 p-4 rounded-lg"
        >
          <Card>
            <h2 className="text-2xl font-bold">For Buyers</h2>
            <p className="mt-2 mb-4">
              Browser avocados produce and discover your favorite variety today
            </p>
            <Link
              to="/avocados/list"
              className="inline-block bg-black
                text-white rounded-lg px-2 py-2
                hover:bg-gray-700"
            >
              Browse Avocados
            </Link>
          </Card>
          <Card bg="bg-green-100">
            <h2 className="text-2xl font-bold">For Famers</h2>
            <p className="mt-2 mb-4">
              Upload your avocado varieties to find the perfect and potential
              buyer
            </p>
            <Link
              onClick={handleSellAvocado}
              to=""
              className="inline-block bg-green-500
                text-white rounded-lg px-2 py-2
                hover:bg-green-600"
            >
              Add Avocados
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
