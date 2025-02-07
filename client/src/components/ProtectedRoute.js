import axios from "axios";
import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import { clearUser} from "../redux/features/userSlice";
import Spinner from "./Spinner";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

export default function ProtectedRoute({ children, allowedRoles }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.post("/api/user/getUserData",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        if (response.data.success) {
          dispatch(setUser(response.data.data));
        }
      } catch (error) {
        localStorage.removeItem("token");
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    };

    if (!user && localStorage.getItem("token")) {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <Spinner />;
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
}  

