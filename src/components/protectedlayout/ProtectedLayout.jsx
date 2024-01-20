import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const { user } = useSelector((state) => state.userSlice);

  return user ? <Outlet /> : <Navigate to="/" />;
}
