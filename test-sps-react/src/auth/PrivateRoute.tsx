import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { JSX } from "react";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" />;
}
