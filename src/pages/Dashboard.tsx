import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch();

  return <div>Dashboard</div>;
};

export default Dashboard;
