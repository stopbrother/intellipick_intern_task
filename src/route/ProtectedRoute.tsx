import { Navigate } from "react-router-dom";
import { useAuthQuery } from "../query/useAuthQuery";

interface ProtectedRouteProps {
  page: JSX.Element;
}

const ProtectedRoute = ({ page }: ProtectedRouteProps) => {
  const { data } = useAuthQuery();
  if (!data?.accessToken) return <Navigate to="/login" />;
  return page;
};

export default ProtectedRoute;
