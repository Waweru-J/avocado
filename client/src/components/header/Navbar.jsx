import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthProvider";
import logo from "../../assets/images/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthUser(null);
    setIsProfileOpen(false);
  };

  const handleSellAvocado = () => {
    if (!authUser) {
      navigate("/signup");
    } else {
      navigate("/farmpage");
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const linkClass = (match) =>
    match
      ? "bg-indigo text-white hover:bg-indigo-500 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-indigo-500 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-green-800 border-b border-green-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <NavLink className="flex flex-shrink-0 item-center mr-4" to="/">
            <img className="h-10 w-auto" src={logo} alt="img" />
            <span className="hidden md:block text-white text-2xl font-bold ml-2">
              React Avocados
            </span>
          </NavLink>
          <div className="md:ml-auto">
            <div className="flex space-x-2">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/avocados/list" className={linkClass}>
                Avocados
              </NavLink>
              <NavLink onClick={handleSellAvocado} to="#" className={linkClass}>
                Sell Avocados
              </NavLink>
              {!authUser && (
                <NavLink to="signup" className={linkClass}>
                  Sign Up
                </NavLink>
              )}
              {authUser && (
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className={linkClass(null, null)}
                  >
                    Profile
                  </button>
                  {isProfileOpen && (
                    <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-md mt-1">
                      <div className="p-4">
                        <p className="text-gray-800 mb-2">
                          Username: {authUser.username}
                        </p>
                        <p className="text-gray-800 mb-2">
                          Phone: {authUser.phone}
                        </p>
                        <p className="text-gray-800 mb-2">
                          Email: {authUser.email}
                        </p>
                        <button
                          onClick={handleLogout}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
