import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import type { TPropProtectorRoute } from "../../types/TProps";

export const ProtectorRoute: React.FC<TPropProtectorRoute> = ({
  children,
  redirectTo = "/authorization",
}) => {
  const { isAuth, loading } = useAuth();
  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <h1>Loading...</h1>
        <span className='rounded-full animate-spin border-3 border-gray-400 border-t-transparent'></span>
      </div>
    );
  }

  return isAuth ? <>{children}</> : <Navigate to={redirectTo} replace />;
};
