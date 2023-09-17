import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Signin";
import MainLayout from "./layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const RoutesRoot = () => {
  const auth = useSelector((state: RootState) => state.userAuth.user);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Login />} />
      <Route
        path="/dashboard"
        element={auth ? <MainLayout /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default RoutesRoot;
