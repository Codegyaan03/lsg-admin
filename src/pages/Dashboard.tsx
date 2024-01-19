import { useDispatch } from "react-redux";
import { useDataSelector } from "../redux/store";

const Dashboard = () => {
  const { token } = useDataSelector("auth");

  const dispatch = useDispatch();

  return <div>Dashboard</div>;
};

export default Dashboard;
