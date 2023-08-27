import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Signin";
import MainLayout from "./layout/Layout";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const RoutesRoot = () => {
  const auth = useSelector((state: RootState) => state.userAuth.user);
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Login />} />
      {!auth && (
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      )}
    </Routes>
  );
};

export default RoutesRoot;
