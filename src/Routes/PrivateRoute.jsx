import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  if (JSON.parse(localStorage.getItem("user"))== false || JSON.parse(localStorage.getItem("user")) ==null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
