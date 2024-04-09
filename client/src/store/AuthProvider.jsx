import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user) {
      setAuthUser(user);
      setToken(JSON.parse(localStorage.getItem("token")));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
