import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notify } from "../helper/sweetaAlert";
import { Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    notify("Bu işlemi yapabilmek için giriş yapmalısın", "error");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
export default PrivateRouter;
