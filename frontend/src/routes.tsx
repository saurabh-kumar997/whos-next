import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Signin";
import MainLayout from "./layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const RoutesRoot = () => {
  const user = useSelector((state: RootState) => state.userAuth.user);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Login />} />
      <Route
        path="/dashboard"
        element={user ? <MainLayout /> : <Navigate to="/signin" replace />}
      />
      <Route path="*" element={<h1>No Page Found</h1>} />
    </Routes>
  );
};

export default RoutesRoot;
