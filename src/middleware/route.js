import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Navigate
        to={"/"}
        replace={true}
      ></Navigate>
    );
  }
  return children;
};

export const Public = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};

export const User = ({children}) => {
  const user = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;

  if (!user?.isCounsellorAccount && !user?.isAdmin) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
}

export const Counsellor = ({children}) => {
  const user = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;

  if (user?.isCounsellorAccount) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
}

export const Admin = ({ children }) => {
  const user = jwtDecode(localStorage.getItem("token"));

  if (user.isAdmin) {
    return children;
  }
  return (
    <Navigate
      to={"/"}
      replace={true}
    ></Navigate>
  );
};
