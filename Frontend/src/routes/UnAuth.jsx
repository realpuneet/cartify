import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const UnAuth = (props) => {
  const  user  = useSelector((state) => state.userReducer);
  return !user ? props.children : <Navigate to="/" />;
};

export default UnAuth;
