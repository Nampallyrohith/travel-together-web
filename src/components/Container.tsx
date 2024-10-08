import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Container = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  useEffect(() => {
    if (!token) {
      navigate("/sign-user");
    }
  }, [token]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Container;
